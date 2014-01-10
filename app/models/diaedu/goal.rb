module Diaedu
  class Goal < KbObj
    scope(:default_order, -> { order('diaedu_kb_objs.name') })

    validates(:name, :description, :presence => true)
    validates(:name, :uniqueness => true, :length => {:minimum => 20}, :unless => lambda{|o| o.name.blank?})

    filterable(:barriers => :related, :triggers => :related, :tags => :related)
  end
end
