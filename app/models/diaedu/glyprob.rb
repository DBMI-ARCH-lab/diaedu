module Diaedu
  class Glyprob < ActiveRecord::Base
    belongs_to(:event, :class_name => 'Diaedu::Event')

    scope(:by_event_name, includes(:event).order('diaedu_events.name, evaluation'))
  end
end
