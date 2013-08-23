module Diaedu
  class GlyprobTrigger < ActiveRecord::Base
    belongs_to(:glyprob, :class_name => 'Diaedu::Glyprob')
    belongs_to(:trigger, :class_name => 'Diaedu::Trigger')
  end
end
