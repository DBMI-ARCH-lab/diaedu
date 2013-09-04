module Diaedu
  # relatively dumb class that receives param_str of form blah-1,2,3-foo-blah,blah, parses the string, and provides easy access to the results
  class Filter
    def initialize(param_str)
      @param_str = param_str
    end
  end
end
