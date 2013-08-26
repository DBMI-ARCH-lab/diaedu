module Diaedu
  class Goal < ActiveRecord::Base
    has_many(:trigger_goals, :class_name => 'Diaedu::TriggerGoal', :foreign_key => 'goal_id', :dependent => :destroy, :autosave => true)
    has_many(:triggers, :class_name => 'Diaedu::Trigger', :through => :trigger_goals)

    def as_json(options = {})
      # spoof the likes and comments attribs for now
      srand(id)
      super(options).merge(:likes => rand(30), :comments => rand(15))
    end
  end
end
