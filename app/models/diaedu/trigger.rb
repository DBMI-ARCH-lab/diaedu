module Diaedu
  class Trigger < ActiveRecord::Base
    include Diaedu::Concerns::Filterable

    has_many(:glyprob_triggers, :class_name => "Diaedu::GlyprobTrigger", :foreign_key => 'trigger_id', :dependent => :destroy, :autosave => true)
    has_many(:glyprobs, :include => :event, :class_name => "Diaedu::Glyprob", :through => :glyprob_triggers)
    has_many(:trigger_goals, :class_name => "Diaedu::TriggerGoal", :foreign_key => 'trigger_id', :dependent => :destroy, :autosave => true)
    has_many(:goals, :class_name => "Diaedu::Goal", :through => :trigger_goals)
    has_many(:taggings, :as => :taggable)
    has_many(:tags, :through => :taggings)

    def as_json(options = {})
      # spoof the likes and comments attribs for now
      srand(id)
      super(options).merge(:likes => rand(30), :comments => rand(15))
    end
  end
end
