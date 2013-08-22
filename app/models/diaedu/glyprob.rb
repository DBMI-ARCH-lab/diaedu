module Diaedu
  class Glyprob < ActiveRecord::Base
    belongs_to(:event, :class_name => 'Diaedu::Event')

    scope(:by_event_name, includes(:event).order('diaedu_events.name, evaluation'))

    def as_json(options = {})
      # spoof the likes and comments attribs for now
      super(options).merge(:likes => rand(30), :comments => rand(15))
    end
  end
end
