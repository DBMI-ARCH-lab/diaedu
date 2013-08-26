require_dependency "diaedu/application_controller"

module Diaedu
  class GlyprobsController < ::ApplicationController
    PER_PAGE = 10

    def index
      page = params[:page].to_i || 1

      # sleep for a second in dev mode to test loading indicators
      sleep(0.25) if Rails.env == 'development'
      
      render(:json => {
        :objs => Diaedu::Glyprob.includes(:tags).by_event_name.offset((page - 1) * PER_PAGE).limit(PER_PAGE).all.as_json(:include => [:event, :tags]),
        :per_page => PER_PAGE,
        :total_count => Diaedu::Glyprob.count
      })
    end
  end
end