module Diaedu
  class Tag < ActiveRecord::Base
    has_many(:taggings, :class_name => 'Diaedu::Tagging')
    has_many(:taggables, :through => :taggings)

    MAX_SUGGESTIONS = 5

    # returns an array of tags matching the given textual query
    # based on code from ELMO (https://github.com/thecartercenter/elmo)
    def self.suggestions(query)
      matches = where("name LIKE ?", "#{query}%").all

      # scan matches
      exact_match = false
      #matches.each_with_index do |m, i|
        # set a flag if there is an exact match
        #exact_match = true if 


      # for i in 0...options.size
      #   # if we have a a partial match
      #   if options[i].name && options[i].name =~ /#{query}/i
      #     # if also an exact match, set a flag and put it at the top
      #     if options[i].name =~ /^#{query}$/i
      #       matches.insert(0, options[i])
      #       exact_match = true
      #     # otherwise just insert at the end
      #     else
      #       matches << options[i]
      #     end
      #   end
      # end
      
      # trim results to max size (couldn't do this earlier b/c had to search whole list for exact match)
      matches = matches[0...MAX_SUGGESTIONS]
      
      # if there was no exact match, we append a 'new option' placeholder
      #matches << new(:name => query) unless exact_match
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
