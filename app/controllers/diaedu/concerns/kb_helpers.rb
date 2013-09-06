module Diaedu
  module Concerns
    module KbHelpers
      
      # transforms a data type (e.g. glyprobs) into a class (e.g. Diaedu::Glyprob)
      def data_type_to_class(dt)
        "Diaedu::#{dt.singularize.classify}".constantize
      end
    end
  end
end