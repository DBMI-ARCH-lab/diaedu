module Diaedu
  class KbObjsController < ::ApplicationController
    include Diaedu::Concerns::KbHelpers

    PER_PAGE = 10

    before_filter(:parse_filter_params, :only => :index)

    def index
      page = params[:page].to_i || 1

      # sleep for a second in dev mode to test loading indicators
      #sleep(0.25) if Rails.env == 'development'
      
      render(:json => {
        :objs => klass.filter_with(@filter).includes(:tags).default_order.offset((page - 1) * PER_PAGE).limit(PER_PAGE).all.as_json(:include => :tags),
        :per_page => PER_PAGE,
        :total_count => klass.filter_with(@filter).count
      })
    end

    def create
      obj = klass.new(params.require(:obj).permit(:name, :description))

      if obj.save
        render(:json => {:page => obj.appears_on_page(:per_page => PER_PAGE, :order => :name), :new_id => obj.id})
      else
        render(:json => {:errors => obj.errors}, :status => 422)
      end
    end

    private
      def parse_filter_params
        @filter = Diaedu::Filter.new(:param_str => params[:filter_params])
      end
  end
end