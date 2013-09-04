module Diaedu
  class Goal < ActiveRecord::Base
    has_many(:trigger_goals, :class_name => 'Diaedu::TriggerGoal', :foreign_key => 'goal_id', :dependent => :destroy, :autosave => true)
    has_many(:triggers, :class_name => 'Diaedu::Trigger', :through => :trigger_goals)
    has_many(:taggings, :as => :taggable)
    has_many(:tags, :through => :taggings)

    def as_json(options = {})
      if options[:id_name_only]
        {:id => id, :name => name}
      else
        # spoof the likes and comments attribs for now
        srand(id)
        super(options).merge(:likes => rand(30), :comments => rand(15))
      end
    end
  end
end
