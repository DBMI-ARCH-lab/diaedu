require_dependency "diaedu/application_controller"

module Diaedu
  # returns filter options for various filter types given a filter param string
  class FilterOptionsController < ::ApplicationController
    def fetch
      render(:json => Array.new(params[:filter_types].size))
    end
  end
end
