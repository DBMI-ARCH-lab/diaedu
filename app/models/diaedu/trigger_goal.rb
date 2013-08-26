module Diaedu
  class TriggerGoal < ActiveRecord::Base
    belongs_to(:trigger, :class_name => 'Diaedu::Trigger')
    belongs_to(:goal, :class_name => 'Diaedu::Goal')
  end
end
