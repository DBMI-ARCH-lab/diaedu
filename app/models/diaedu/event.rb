module Diaedu
  class Event < ActiveRecord::Base
    has_many(:glyprobs, :class_name => 'Diaedu::Glyprob')

    def self.suggestions(query)
      where("name ILIKE ?", "%#{query}%").all
    end
  end
end
