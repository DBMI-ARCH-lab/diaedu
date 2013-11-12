# implements methods used by models that are filterable (e.g. glyprobs, triggers, goals)
module Diaedu::Concerns::Filterable
  extend ActiveSupport::Concern

  included do

    # dsl-style method for setting options from base class
    def self.filterable(options = {})
      class_variable_set('@@filterable_fields', options)
    end

    # accessor for within the concern
    def self.filterable_fields
      class_variable_defined?('@@filterable_fields') ? class_variable_get('@@filterable_fields') : nil
    end

    # returns a Relation including where clauses that implement the given filter
    def self.filter_with(filter)
      rel = scoped

      # add condition for each kb obj subtype      
      Diaedu::KbObj::SUBTYPES.each do |t|
        if filter[t]
          rel = rel.where('EXISTS (SELECT id FROM diaedu_kb_links 
            WHERE diaedu_kb_objs.id = obj1_id AND obj2_id IN (?) OR
              diaedu_kb_objs.id = obj2_id AND obj1_id IN (?))', filter[t], filter[t])
        end
      end
      
      if filter[:tags]
        rel = rel.includes(:taggings).where('diaedu_taggings.tag_id' => filter[:tags])
      end

      if filter[:eval]
        # note that eval is actually an array of possible evals, but this should work anyway
        rel = rel.where('diaedu_kb_objs.evaluation' => filter[:eval])
      end

      # should always be approved
      rel = rel.where(:approved => true)

      return rel
    end

    # gets an array of filter options for the filterable fields as defined in the base class
    # bases the results on objects from the base class matching the given filter
    def self.filter_options(filter)
      filterable_fields.keys.map do |field|
        filter_options_for_field(field, filter)
      end
    end

    # returns filter options for the given field
    # restricts to objects that are related to the objects from current model with the given filter applied, if appropriate
    # return value is a data structure suited to the KbFilterBlock client side model 
    def self.filter_options_for_field(field, filter)
      # first get all objs with given filter applied, but WITHOUT the portion of the filter for the given field
      # THESE are the objects to which the returned filter options must be related
      filtered = filter_with(filter.without(field))

      # if the field is glyprob, trigger, etc., just get the (approved) objects that are related to the 
      # filtered set of objects
      if Diaedu::KbObj::SUBTYPES.include?(field)
        option_filter = Diaedu::Filter.new(:items => {field => filtered.map(&:id)})
        objs = model_for_field(field).filter_with(option_filter)

      # else if it's tags or evals, get the ones that are related to the filtered set of objects
      elsif field == :tags || field == :eval
        
        filtered = filtered.includes(:tags) if field == :tags

        # scan through each retrieved object and load the matching related object data into an array
        objs = filtered.map{|o| o.send(field)}.flatten.uniq

      else
        raise "unrecognized filter field '#{field}'"
      end

      # get the ids (strings) of all objects that are selected in the filter
      checked = filter[field] || []

      # go through each item and mark if it should be checked
      items = objs.map{|o| {:isChecked => checked.include?(o.id.to_s), :obj => o}}

      # if the filterable field spec said to include all objects, add any that are missing
      # and give them a special 'isGreyed' property
      if filterable_fields[field] == :all
        (model_for_field(field).all - objs).each do |o|
          items << {:isChecked => false, :isGreyed => true, :obj => o}
        end
      end

      # if there are lots of items sort items by whether they're checked, and then by name
      if items.size > 10
        items.sort_by!{|o| (o[:isChecked] ? 'A-' : 'B-') + o[:obj].name}
      # else just sort by name
      else
        items.sort_by!{|o| o[:obj].name}
      end

      {:type => field, :items => items, :noneChecked => checked.empty?}
    end

    # gets the model class for the given filter field
    def self.model_for_field(field)
      "Diaedu::#{field.to_s.classify}".constantize
    end

  end
end
