module Diaedu
  class Trigger < ActiveRecord::Base
    has_many(:glyprob_triggers, :class_name => "Diaedu::GlyprobTrigger", :foreign_key => 'trigger_id', :dependent => :destroy, :autosave => true)
    has_many(:glyprobs, :class_name => "Diaedu::Glyprob", :through => :glyprob_triggers)
    has_many(:trigger_goals, :class_name => "Diaedu::TriggerGoal", :foreign_key => 'trigger_id', :dependent => :destroy, :autosave => true)
    has_many(:goals, :class_name => "Diaedu::Goal", :through => :trigger_goals)
    has_many(:taggings, :as => :taggable)
    has_many(:tags, :through => :taggings)

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

    # gets an array of related objects of the given type, based on the given filter
    def self.related_objects(type, filter)
      # first get all triggers with given filter applied, and including the appropriate association
      # TODO fix n+1 with events here
      filtered = filter_with(filter).includes(type).all

      # now scan through each retrieved object and load the matching related object data into an array
      objs = filtered.map{|o| o.send(type)}.flatten.uniq

      # get the ids (strings) of all objects that are selected in the filter
      checked = filter[type.to_sym] || []

      # go through each item and mark if it should be checked
      items = objs.map{|o| {:isChecked => checked.include?(o.id.to_s), :obj => o}}

      {:type => type, :items => items, :noneChecked => checked.empty?}
    end

    def as_json(options = {})
      # spoof the likes and comments attribs for now
      srand(id)
      super(options).merge(:likes => rand(30), :comments => rand(15))
    end
  end
end
