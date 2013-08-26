module Diaedu
  class Tag < ActiveRecord::Base
    has_many(:taggings, :class_name => 'Diaedu::Tagging')
    has_many(:taggables, :through => :taggings)
  end
end
