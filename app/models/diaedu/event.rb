module Diaedu
  class Event < ActiveRecord::Base
  	has_many(:glyprobs, :class_name => 'Diaedu::Glyprob')
  end
end
