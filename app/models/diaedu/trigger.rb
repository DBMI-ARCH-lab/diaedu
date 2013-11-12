module Diaedu
  class Trigger < KbObj
    scope(:default_order, order('diaedu_kb_objs.name'))

    validates(:name, :description, :presence => true)
    validates(:name, :uniqueness => true, :length => {:minimum => 20}, :unless => lambda{|t| t.name.blank?})

    filterable(:glyprobs => :related, :goals => :related, :tags => :related)

    # determines which page of objects this object would appear on
    def appears_on_page(options = {})
      # get number of objects before this one
      before = self.class.where("#{options[:order]} < ?", send(options[:order])).count
      (before / options[:per_page]) + 1
    end
  end
end
