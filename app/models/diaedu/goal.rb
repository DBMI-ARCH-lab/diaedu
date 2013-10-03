module Diaedu
  class Goal < ActiveRecord::Base
    include Diaedu::Concerns::Approvable
    include Diaedu::Concerns::Filterable
    include Diaedu::Concerns::Commentable

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

    def as_json(options = {})
      if options[:id_name_only]
        {:id => id, :name => name}
      else
        # spoof the likes and comments attribs for now
        srand(id) unless new_record?
        super(options).merge(:likes => rand(30), :comments => rand(15), :views => rand(200))
      end
    end
  end
end
