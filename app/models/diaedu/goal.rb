module Diaedu
  class Goal < KbObj
    scope(:default_order, order('diaedu_kb_objs.name'))

    validates(:name, :description, :presence => true)
    validates(:name, :uniqueness => true, :length => {:minimum => 20}, :unless => lambda{|o| o.name.blank?})

    filterable(:triggers => :related, :tags => :related)

    # associates with triggers with the given IDs
    def parent_ids=(ids)
      ids.each{|id| trigger_goals.build(:trigger_id => id)}
    end
  end
end
