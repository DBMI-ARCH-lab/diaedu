module Diaedu
  class Trigger < KbObj
    scope(:default_order, order('diaedu_kb_objs.name'))

    validates(:name, :description, :presence => true)
    validates(:name, :uniqueness => true, :length => {:minimum => 20}, :unless => lambda{|t| t.name.blank?})

    filterable(:glyprobs => :related, :goals => :related, :tags => :related)
  end
end
