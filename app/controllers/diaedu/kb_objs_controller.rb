module Diaedu
  class KbObjsController < ::ApplicationController
    include Diaedu::Concerns::KbHelpers

    PER_PAGE = 10

    before_filter(:parse_filter_params, :only => :index)

    def index

      if params[:for_select]
        render(:json => klass.approved.default_order.filter_with(@filter).all.as_json(:id_name_only => true), :root => false)

      else
        page = params[:page] ? params[:page].to_i : 1

        # sleep for a second in dev mode to test loading indicators
        #sleep(0.25) if Rails.env == 'development'
        
        render(:json => {
          :objs => klass.approved.filter_with(@filter).includes(:tags).default_order.
            offset((page - 1) * PER_PAGE).limit(PER_PAGE).as_json(:include => :tags),
          :per_page => PER_PAGE,
          :total_count => klass.approved.filter_with(@filter).count
        })
      end
    end

    def show
      # get object and increment views
      obj = klass.includes(:topic => :posts).find(params[:id])
      obj.increment_view_count!

      # render as json
      render(:json => obj, :root => false, :comment_preview => true)
    end

    def create
      obj = klass.new(params.require(:obj).permit(:name, :description, :event_name, :evaluation, :parent_ids => [], 
        :taggings_attributes => [:tag_id, :_destroy, :tag_attributes => [:name]]))

      if obj.save
        render(:json => {})
      else
        render(:json => {:errors => obj.errors})
      end
    end

    # ensures there is a topic associated with the given object
    # returns the topic's json
    def ensure_topic
      # find the robot user, and error if doesn't exist
      robot = User.where(:username => 'kbbot').first or raise "couldn't find user kbbot. please create and try again."

      render(:json => klass.find(params[:id]).ensure_topic(robot), :root => false)
    end

    private
      def parse_filter_params
        @filter = Diaedu::Filter.new(:param_str => params[:filter_params])
      end
  end
end