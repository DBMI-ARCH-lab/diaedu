module Diaedu
  # relatively dumb class that receives param_str of form blah-1,2,3-foo-blah,blah, parses the string, and provides easy access to the results
  class Filter
    def initialize(params = {})
      if params[:param_str]
        param_str = params[:param_str] || ''

        # if param_str is just 'all', that's the same as no params
        param_str = '' if param_str == 'all'

        # split params into a hash of arrays (a-1,2,3-b-1,2 => {:a => [1,2,3], :b => [1,2]})
        @items = {}
        cur_key = nil
        param_str.split('-').each_with_index do |chunk, i|
          # for even chunks, create hash key
          if i % 2 == 0
            cur_key = chunk.to_sym
            @items[chunk] = []

          # for odd chunks, split again to create value array, and store in hash
          else
            @items[cur_key] = chunk.split(',')
          end
        end
      else
        @items = params[:items]
      end
    end

    # accessor for @items
    def [](key)
      @items[key]
    end

    # returns a filter based on this filter but without the given key
    def without(key)
      f = Filter.new(:items => @items.except(key))
    end
  end
end
