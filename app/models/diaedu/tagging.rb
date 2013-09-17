module Diaedu
  class Tagging < ActiveRecord::Base
    belongs_to(:taggable, :polymorphic => true)
    belongs_to(:tag, :class_name => 'Diaedu::Tag')

    accepts_nested_attributes_for(:tag)
  end
end
