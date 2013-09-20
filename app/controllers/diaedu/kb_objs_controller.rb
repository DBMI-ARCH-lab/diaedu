module Diaedu
  class KbObjsController < ::ApplicationController
    include Diaedu::Concerns::KbHelpers

    PER_PAGE = 10

    before_filter(:parse_filter_params, :only => :index)

    def index

      if params[:for_select]
        render(:json => klass.approved.default_order.all.as_json(:id_name_only => true), :root => false)

      else
        page = params[:page].to_i || 1

        # sleep for a second in dev mode to test loading indicators
        #sleep(0.25) if Rails.env == 'development'
        
        render(:json => {
          :objs => klass.approved.filter_with(@filter).includes(:tags).default_order.
            offset((page - 1) * PER_PAGE).limit(PER_PAGE).as_json(:include => :tags),
          :per_page => PER_PAGE,
          :total_count => klass.filter_with(@filter).count
        })
      end
    end

    def show
      render(:json => klass.find(params[:id]), :root => false)
    end

    def create
      obj = klass.new(params.require(:obj).permit(:name, :description, :event_name, :evaluation, :parent_ids => [], 
        :taggings_attributes => [:tag_id, :_destroy, :tag_attributes => [:name]]))

      if obj.save
        render(:json => {})
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