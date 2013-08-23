module Diaedu
  class Trigger < ActiveRecord::Base
    has_many(:glyprob_triggers, :class_name => "Diaedu::GlyprobTrigger", :foreign_key => 'trigger_id', :dependent => :destroy, :autosave => true)
    has_many(:glyprobs, :class_name => "Diaedu::Glyprob", :through => :glyprob_triggers)
  end
end
