module Diaedu
  class Trigger < ActiveRecord::Base
    include Diaedu::Concerns::Approvable
    include Diaedu::Concerns::Filterable

    has_many(:glyprob_triggers, :class_name => "Diaedu::GlyprobTrigger", :foreign_key => 'trigger_id', :dependent => :destroy, :autosave => true)
    has_many(:glyprobs, :include => :event, :class_name => "Diaedu::Glyprob", :through => :glyprob_triggers)
    has_many(:trigger_goals, :class_name => "Diaedu::TriggerGoal", :foreign_key => 'trigger_id', :dependent => :destroy, :autosave => true)
    has_many(:goals, :class_name => "Diaedu::Goal", :through => :trigger_goals)
    has_many(:taggings, :as => :taggable)
    has_many(:tags, :through => :taggings)

    scope(:default_order, order('diaedu_triggers.name'))

    validates(:name, :description, :presence => true)
    validates(:name, :uniqueness => true, :length => {:minimum => 20}, :unless => lambda{|t| t.name.blank?})

    filterable(:glyprobs => :related, :goals => :related, :tags => :related)

    accepts_nested_attributes_for(:taggings, :allow_destroy => true)

    # determines which page of objects this object would appear on
    def appears_on_page(options = {})
      # get number of objects before this one
      before = self.class.where("#{options[:order]} < ?", send(options[:order])).count
      (before / options[:per_page]) + 1
    end

    # associates with glyprobs with the given IDs
    def parent_ids=(ids)
      ids.each{|id| glyprob_triggers.build(:glyprob_id => id)}
    end

    def as_json(options = {})
      # spoof the likes and comments attribs for now
      srand(id) unless new_record?
      super(options).merge(:likes => rand(30), :comments => rand(15))
    end
  end
end
