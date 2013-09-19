module Diaedu
  class Event < ActiveRecord::Base
    has_many(:glyprobs, :class_name => 'Diaedu::Glyprob')

    before_validation(:normalize_fields)

    validates(:name, :presence => true, :uniqueness => true)

    def self.suggestions(query)
      where("name ILIKE ?", "%#{query}%").all
    end

    private

      def normalize_fields
        # ensure first letter of name is capital
        self.name = name.slice(0,1).capitalize + name.slice(1..-1) unless name.blank?
        return true
      end
  end
end