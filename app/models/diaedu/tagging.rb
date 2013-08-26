module Diaedu
  class Tagging < ActiveRecord::Base
    belongs_to(:taggable, :polymorphic => true)
    belongs_to(:tag, :class_name => 'Diaedu::Tag')
  end
end
