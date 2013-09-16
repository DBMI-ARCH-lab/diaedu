module Diaedu
  class Goal < ActiveRecord::Base
    include Diaedu::Concerns::Approvable
    include Diaedu::Concerns::Filterable

    has_many(:trigger_goals, :class_name => 'Diaedu::TriggerGoal', :foreign_key => 'goal_id', :dependent => :destroy, :autosave => true)
    has_many(:triggers, :class_name => 'Diaedu::Trigger', :through => :trigger_goals)
    has_many(:taggings, :as => :taggable)
    has_many(:tags, :through => :taggings)

    scope(:default_order, order('diaedu_goals.name'))

    def as_json(options = {})
      if options[:id_name_only]
        {:id => id, :name => name}
      else
        # spoof the likes and comments attribs for now
        srand(id) unless new_record?
        super(options).merge(:likes => rand(30), :comments => rand(15))
      end
    end
  end
end
