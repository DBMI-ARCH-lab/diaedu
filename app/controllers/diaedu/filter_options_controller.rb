module Diaedu
  # returns filter options for various filter types given a filter param string
  class FilterOptionsController < ::ApplicationController
    include Diaedu::Concerns::KbHelpers

    def fetch
      # parse filter params into Filter object
      filter = Diaedu::Filter.new(:param_str => params[:filter_params])

      # get the klass for the given data type
      klass = data_type_to_class(params[:data_type])

      # use as_json option to reduce data size
      render(:json => klass.filter_options(filter).as_json(:id_name_only => true))
    end
  end
end
