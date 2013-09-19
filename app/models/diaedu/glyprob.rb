module Diaedu
  class Glyprob < ActiveRecord::Base
    include Diaedu::Concerns::Approvable
    include Diaedu::Concerns::Filterable

    belongs_to(:event, :class_name => 'Diaedu::Event')
    has_many(:glyprob_triggers, :class_name => 'Diaedu::GlyprobTrigger', :foreign_key => 'glyprob_id', :dependent => :destroy, :autosave => true)
    has_many(:triggers, :class_name => 'Diaedu::Trigger', :through => :glyprob_triggers)
    has_many(:taggings, :as => :taggable)
    has_many(:tags, :through => :taggings)

    scope(:default_order, includes(:event).order('diaedu_events.name, diaedu_glyprobs.evaluation'))

    filterable(:eval => :all, :tags => :related)

    accepts_nested_attributes_for(:taggings, :allow_destroy => true)

    before_validation(:normalize_fields)

    # returns all possible evals
    def self.all_evals
      %w(high low)
    end

    def name
      "#{evaluation.capitalize} #{event.name.downcase}"
    end

    # finds or creates an event to match the given name
    def event_name=(name)
      self.event = Event.find_or_create_by_name(name.strip)
    end

    # returns an eval object representing this glyprob's evaluation
    def eval
      Eval.get(evaluation)
    end

    def as_json(options = {})
      if options[:id_name_only]
        {:id => id, :name => name}
      else
        srand(id) unless new_record?
        # spoof the likes and comments attribs for now
        super(options).merge(:likes => rand(30), :comments => rand(15), :name => name)
      end
    end

    private

      # trims whitespace, etc.
      def normalize_fields
        self.description = description.strip unless description.blank?
      end
  end
end