module Diaedu
  class Tagging < ActiveRecord::Base
    belongs_to(:obj, :class_name => 'Diaedu::KbObj')
    belongs_to(:tag, :class_name => 'Diaedu::Tag')

    accepts_nested_attributes_for(:tag)
  end
end
