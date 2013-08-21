module Diaedu
  class Glyprob < ActiveRecord::Base
    belongs_to(:event, :class_name => 'Diaedu::Event')
  end
end
