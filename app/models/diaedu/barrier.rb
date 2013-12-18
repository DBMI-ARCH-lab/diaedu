module Diaedu
  class Barrier < KbObj
    scope(:default_order, -> { order('diaedu_kb_objs.name') })

    validates(:name, :description, :presence => true)
    validates(:name, :uniqueness => true, :length => {:minimum => 20}, :unless => lambda{|t| t.name.blank?})

    filterable(:triggers => :related, :goals => :related, :tags => :related)
  end
end