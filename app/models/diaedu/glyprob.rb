module Diaedu
  class Glyprob < ActiveRecord::Base
    belongs_to(:event, :class_name => 'Diaedu::Event')
    has_many(:glyprob_triggers, :class_name => 'Diaedu::GlyprobTrigger', :foreign_key => 'glyprob_id', :dependent => :destroy, :autosave => true)
    has_many(:triggers, :class_name => 'Diaedu::Trigger', :through => :glyprob_triggers)

    scope(:by_event_name, includes(:event).order('diaedu_events.name, evaluation'))

    def name
      "#{evaluation.capitalize} #{event.name.downcase}"
    end

    def as_json(options = {})
      srand(id)
      # spoof the likes and comments attribs for now
      super(options).merge(:likes => rand(30), :comments => rand(15), :name => name)
    end
  end
end
