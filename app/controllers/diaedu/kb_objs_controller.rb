module Diaedu
  class KbObjsController < ::ApplicationController
    include Concerns::KbHelpers

    DEFAULT_PER_PAGE = 10

    before_filter(:parse_filter_params, :only => :index)

    def index
      if params[:for_select]
        render(:json => klass.approved.default_order.filter_with(@filter).all.as_json(:id_name_only => true), :root => false)

      else
        page = (params[:page] || 1).to_i
        per_page = (params[:per_page] || DEFAULT_PER_PAGE).to_i

        render(:json => {
          :objs => klass.approved.filter_with(@filter).includes(:tags).default_order.
            offset((page - 1) * per_page).limit(per_page).as_json(:include => :tags),
          :per_page => per_page,
          :total_count => klass.approved.filter_with(@filter).count
        })
      end
    end

    def show
      # get object and increment views
      obj = klass.includes(:topic => :posts).find(params[:id])
      obj.increment_view_count! unless params[:dont_add_view]

      # if requested to ensure topic, do so
      obj.ensure_topic if params[:ensure_topic]

      # get json
      json = obj.as_json(:root => false, :comment_preview => true)

      # add first post to json using special serializer
      json[:firstPost] = if obj.first_post
        # setup a serializer
        PostSerializer.new(obj.first_post, scope: guardian, root: false).tap do |ps|
          # load the post actions (for some reason this has to be done manually)
          ps.post_actions = PostAction.counts_for([obj.first_post], current_user)[obj.first_post.id]
        end
      else
        nil
      end

      # render as json
      render(:json => json)
    end

    def create
      # permit attributes and extract evidence
      attribs = params.require(:obj).permit(:name, :description, :event_name, :evaluation, :inlink_ids => [],
        :taggings_attributes => [:tag_id, :_destroy, :tag_attributes => [:name]],
        :evidence_items_attributes => [:id, :kind, :title, :url]
      )
      evidence_attribs = attribs.delete(:evidence_items_attributes)

      # build the obj minus the evidence items
      obj = klass.new(attribs)

      # assign evidence attributes
      evidence_attribs.values.each do |a|
        if a[:id].present?
          item = EvidenceItem.find(a[:id])
          item.assign_attributes(a)
          obj.evidence_items << item
        else
          obj.evidence_items.build(a)
        end
      end

      # save and render
      render(:json => obj.save ? {} : {:errors => obj.errors, :evidence_errors => obj.evidence_items.map(&:error_messages)})
    end

    # ensures there is a topic associated with the given object
    # returns the topic's json
    def ensure_topic
      render(:json => klass.find(params[:id]).ensure_topic, :root => false)
    end

    # looks for a kb obj matching the given topic id
    def by_topic_id
      obj = KbObj.where(:topic_id => params[:topic_id]).first
      render(:json => obj ? obj.as_json(:only => :id, :methods => :unqualified_type) : nil)
    end

    private
      def parse_filter_params
        @filter = Filter.new(:param_str => params[:filter_params])
      end
  end
end