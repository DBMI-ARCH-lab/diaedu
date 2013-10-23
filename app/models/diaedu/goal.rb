module Diaedu
  class Goal < ActiveRecord::Base
    include Diaedu::Concerns::Approvable
    include Diaedu::Concerns::Filterable
    include Diaedu::Concerns::Commentable
    include Diaedu::Concerns::Jsonable
    include Diaedu::Concerns::Kbable

    has_many(:trigger_goals, :class_name => 'Diaedu::TriggerGoal', :foreign_key => 'goal_id', :dependent => :destroy, :autosave => true)
    has_many(:triggers, :class_name => 'Diaedu::Trigger', :through => :trigger_goals)
    has_many(:taggings, :as => :taggable)
    has_many(:tags, :through => :taggings)

    scope(:default_order, order('diaedu_goals.name'))

    validates(:name, :description, :presence => true)
    validates(:name, :uniqueness => true, :length => {:minimum => 20}, :unless => lambda{|o| o.name.blank?})

    filterable(:triggers => :related, :tags => :related)

    accepts_nested_attributes_for(:taggings, :allow_destroy => true)

    # associates with triggers with the given IDs
    def parent_ids=(ids)
      ids.each{|id| trigger_goals.build(:trigger_id => id)}
    end
  end
end
