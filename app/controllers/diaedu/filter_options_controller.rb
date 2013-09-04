require_dependency "diaedu/application_controller"

module Diaedu
  # returns filter options for various filter types given a filter param string
  class FilterOptionsController < ::ApplicationController
    def fetch
      # parse filter params into Filter object
      filter = Diaedu::Filter.new(params[:filter_params])

      block_data = []

      params[:filter_types].each do |filter_type|
        # for each filter type, fetch all possible related objects from appropriate model
        block_data << Diaedu::Trigger.related_objects(filter_type, filter)
      end

      render(:json => block_data)
    end
  end
end
