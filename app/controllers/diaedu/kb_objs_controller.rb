require_dependency "diaedu/application_controller"

module Diaedu
  class KbObjsController < ::ApplicationController
    PER_PAGE = 10

    before_filter(:parse_filter_params, :only => :index)

    def index
      page = params[:page].to_i || 1

      # sleep for a second in dev mode to test loading indicators
      #sleep(0.25) if Rails.env == 'development'
      
      klass = "Diaedu::#{params[:data_type].singularize.classify}".constantize

      render(:json => {
        :objs => klass.filter_with(@filter).includes(:tags).offset((page - 1) * PER_PAGE).limit(PER_PAGE).all.as_json(:include => :tags),
        :per_page => PER_PAGE,
        :total_count => klass.filter_with(@filter).count
      })
    end

    private
      def parse_filter_params
        @filter = Diaedu::Filter.new(:param_str => params[:filter_params])
      end
  end
end
