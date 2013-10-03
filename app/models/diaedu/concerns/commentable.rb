# implements methods and scopes related to discourse comments associated with objects
module Diaedu::Concerns::Commentable
  extend ActiveSupport::Concern

  included do
    belongs_to(:topic)
  end

  # ensures there is a topic associated with this given object
  # creates one with default initial post and in correct category if not
  def ensure_topic!(user)
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
    end
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
