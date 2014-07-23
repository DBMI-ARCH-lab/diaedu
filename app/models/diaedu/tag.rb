module Diaedu
  class Tag < ActiveRecord::Base
    has_many(:taggings, :class_name => 'Diaedu::Tagging', :dependent => :destroy)
    has_many(:objs, :through => :taggings)

    scope(:default_order, ->{ order('name') })

    MAX_SUGGESTIONS = 5

    # returns an array of tags matching the given textual query
    # based on code from ELMO (https://github.com/thecartercenter/elmo)
    def self.suggestions(query)
      query.downcase!

      matches = where("name LIKE ?", "#{query}%").to_a

      # scan matches for exact match
      exact_match = false
      matches.each_with_index do |t, i|
        # if we find an exact match
        if t.name == query
          # move it to front of array and set flag
          matches.unshift(matches.delete_at(i))
          exact_match = true
          break
        end
      end

      # trim results to max size (couldn't do this earlier b/c had to search whole list for exact match)
      matches = matches[0...MAX_SUGGESTIONS]

      # if there was no exact match, we append a 'new' placeholder
      matches << new(:name => query) unless exact_match

      matches
    end


    def as_json(options = {})
      if options[:id_name_only]
        {:id => id, :name => name}
      else
        super(options)
      end
    end
  end
end
