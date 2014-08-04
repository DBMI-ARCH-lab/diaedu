module Diaedu
  class Glyprob < KbObj

    EVALS = %w(high low)

    belongs_to(:event, :class_name => 'Diaedu::Event', :autosave => true)

    scope(:default_order, -> { includes(:event).order('diaedu_events.name, diaedu_kb_objs.evaluation') })

    filterable(:eval => :all, :tags => :related)

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
      "#{evaluation.capitalize} #{event.name}"
    end

    # finds or creates an event to match the given name
    def event_name=(name)
      self.event = Event.find_or_initialize_by(:name => name.strip)
    end

    # returns an eval object representing this glyprob's evaluation
    def eval
      Eval.get(evaluation)
    end

    private

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