module Diaedu
  class Tag < ActiveRecord::Base
    has_many(:taggings, :class_name => 'Diaedu::Tagging')
    has_many(:taggables, :through => :taggings)

    def as_json(options = {})
      if options[:id_name_only]
        {:id => id, :name => name}
      else
        super(options)
      end
    end
  end
end
