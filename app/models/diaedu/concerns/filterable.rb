# implements methods used by models that are filterable (e.g. glyprobs, triggers, goals)
module Diaedu
  module Concerns
    module Filterable
      extend ActiveSupport::Concern

      included do

        # returns a Relation including where clauses that implement the given filter
        def self.filter_with(filter)
          rel = scoped
          if filter[:glyprobs]
            rel = rel.includes(:glyprob_triggers).where('diaedu_glyprob_triggers.glyprob_id' => filter[:glyprobs])
          end
          if filter[:goals]
            rel = rel.includes(:trigger_goals).where('diaedu_trigger_goals.goal_id' => filter[:goals])
          end
          if filter[:tags]
            rel = rel.includes(:taggings).where('diaedu_taggings.tag_id' => filter[:tags])
          end
          return rel
        end

        # gets a set of objects of the given type that are related to the objects from current model with the given filter applied
        # return value is a data structure suited to the KbFilterBlock client side model 
        def self.filter_options(type, filter)
          # first get all triggers with given filter applied, but WITHOUT the portion of the filter for the given type
          # include the appropriate associations
          filtered = filter_with(filter.without(type)).includes(type).all

          # now scan through each retrieved object and load the matching related object data into an array
          objs = filtered.map{|o| o.send(type)}.flatten.uniq

          # get the ids (strings) of all objects that are selected in the filter
          checked = filter[type] || []

          # go through each item and mark if it should be checked
          items = objs.map{|o| {:isChecked => checked.include?(o.id.to_s), :obj => o}}

          # sort items by whether they're checked, and then by name
          items.sort_by!{|o| (o[:isChecked] ? 'A-' : 'B-') + o[:obj].name}

          {:type => type, :items => items, :noneChecked => checked.empty?}
        end

      end
    end
  end
end
