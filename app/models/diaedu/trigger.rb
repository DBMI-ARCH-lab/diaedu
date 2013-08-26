module Diaedu
  class Trigger < ActiveRecord::Base
    has_many(:glyprob_triggers, :class_name => "Diaedu::GlyprobTrigger", :foreign_key => 'trigger_id', :dependent => :destroy, :autosave => true)
    has_many(:glyprobs, :class_name => "Diaedu::Glyprob", :through => :glyprob_triggers)

    def as_json(options = {})
      # spoof the likes and comments attribs for now
      srand(id)
      super(options).merge(:likes => rand(30), :comments => rand(15))
    end
  end
end
