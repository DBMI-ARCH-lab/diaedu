module Diaedu
  class Glyprob < ActiveRecord::Base
    include Diaedu::Concerns::Filterable

    belongs_to(:event, :class_name => 'Diaedu::Event')
    has_many(:glyprob_triggers, :class_name => 'Diaedu::GlyprobTrigger', :foreign_key => 'glyprob_id', :dependent => :destroy, :autosave => true)
    has_many(:triggers, :class_name => 'Diaedu::Trigger', :through => :glyprob_triggers)
    has_many(:taggings, :as => :taggable)
    has_many(:tags, :through => :taggings)

    scope(:by_event_name, includes(:event).order('diaedu_events.name, evaluation'))

    def name
      "#{evaluation.capitalize} #{event.name.downcase}"
    end

    def evals
      []
    end

    def as_json(options = {})
      if options[:id_name_only]
        {:id => id, :name => name}
      else
        srand(id)
        # spoof the likes and comments attribs for now
        super(options).merge(:likes => rand(30), :comments => rand(15), :name => name)
      end
    end
  end
end
