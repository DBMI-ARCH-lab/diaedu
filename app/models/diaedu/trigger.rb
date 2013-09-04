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
      return rel
    end

    def as_json(options = {})
      # spoof the likes and comments attribs for now
      srand(id)
      super(options).merge(:likes => rand(30), :comments => rand(15))
    end
  end
end
