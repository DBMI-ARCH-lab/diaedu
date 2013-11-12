module Diaedu
  class KbLink < ActiveRecord::Base
    belongs_to(:parent, :class_name => 'Diaedu::KbObj', :foreign_key => 'obj1_id')
    belongs_to(:child, :class_name => 'Diaedu::KbObj', :foreign_key => 'obj2_id')
  end
end
