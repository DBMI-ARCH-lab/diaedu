module Diaedu
  class Glyprob < ActiveRecord::Base
    include Diaedu::Concerns::Approvable
    include Diaedu::Concerns::Filterable

    EVALS = %w(high low)

    belongs_to(:event, :class_name => 'Diaedu::Event', :autosave => true)
    has_many(:glyprob_triggers, :class_name => 'Diaedu::GlyprobTrigger', :foreign_key => 'glyprob_id', :dependent => :destroy, :autosave => true)
    has_many(:triggers, :class_name => 'Diaedu::Trigger', :through => :glyprob_triggers)
    has_many(:taggings, :as => :taggable)
    has_many(:tags, :through => :taggings)

    scope(:default_order, includes(:event).order('diaedu_events.name, diaedu_glyprobs.evaluation'))

    filterable(:eval => :all, :tags => :related)

    accepts_nested_attributes_for(:taggings, :allow_destroy => true)

    before_validation(:normalize_fields)

    validates(:evaluation, :presence => true)
    validates(:evaluation, :inclusion => {:in => EVALS}, :unless => lambda{|o| o.evaluation.blank?})
    validates(:description, :presence => true)
    validates(:event, :presence => true)
    validate(:eval_event_unique)

    # returns all possible evals
    def self.all_evals
      EVALS
    end

    def name
      "#{evaluation.capitalize} #{event.name.downcase}"
    end

    # finds or creates an event to match the given name
    def event_name=(name)
      self.event = Event.find_or_initialize_by_name(name.strip)
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

      # ensures combination of evaluation and event has not been taken
      def eval_event_unique
        # no need to check if event is new_record
        return if event.nil? || event.new_record?

        rel = self.class.where(:evaluation => evaluation).where(:event_id => event.id)
        rel = rel.where('id != ?', id) unless new_record?

        errors.add(:base, :eval_event_taken) unless rel.empty?
      end
  end
end