# implements methods and scopes related to discourse comments associated with objects
module Diaedu::Concerns::Commentable
  extend ActiveSupport::Concern

  COMMENTS_IN_PREVIEW = 2

  included do
    belongs_to(:topic)
  end

  # ensures there is a topic associated with this given object
  # creates one with default initial post and in correct category if not
  def ensure_topic(user)
    if topic.nil?
      params = {}
      params[:raw] = "*#{topic_intro}*\n\n#{description}"
      params[:title] = name
      params[:archetype] = 'regular'
      params[:category] = topic_category_name

      # we create the topic via a post
      post = PostCreator.new(user, params).create

      # then we get the topic from the post
      self.topic = post.topic
      save!
    end
    # return for chainability
    topic
  end

  # returns a json representation of the earliest N comments for this object (excepting the original auto-gen'd comment)
  # if the topic has not been setup yet (it only gets setup when the user clicks 'add first comment'),
  # then the topic will be nil, and we just return an empty array
  def comment_preview_as_json
    (topic.nil? ? [] : topic.posts[1..COMMENTS_IN_PREVIEW]).as_json
  end

  # returns the total number of comments on this object (not including the autogen'd one)
  def comment_count
    topic.nil? ? 0 : topic.posts.size - 1
  end

  def i18n_key
    'js.kb.' + self.class.name.demodulize.pluralize.downcase
  end

  def topic_category_name
    # lookup category title using english translation file since categories are in english
    # we use count => 2 b/c we want the plural title
    I18n.t("#{i18n_key}.title", :count => 2, :locale => :en)
  end

  def topic_intro
    I18n.t("#{i18n_key}.topic_intro", :name => name, :locale => :en)
  end
end
