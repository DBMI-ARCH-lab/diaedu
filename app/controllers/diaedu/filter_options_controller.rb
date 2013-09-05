require_dependency "diaedu/application_controller"

module Diaedu
  # returns filter options for various filter types given a filter param string
  class FilterOptionsController < ::ApplicationController
    def fetch
      # parse filter params into Filter object
      filter = Diaedu::Filter.new(:param_str => params[:filter_params])

      block_data = []

      # get the klass for the given data type
      klass = "Diaedu::#{params[:data_type].singularize.classify}".constantize

      params[:filter_types].each do |filter_type|
        # for each filter type, fetch all possible related objects from appropriate model
        block_data << klass.filter_options(filter_type.to_sym, filter)
      end

      # use as_json option to reduce data size
      render(:json => block_data.as_json(:id_name_only => true))
    end
  end
end
