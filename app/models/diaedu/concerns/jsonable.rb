module Diaedu::Concerns::Jsonable
  extend ActiveSupport::Concern

  def as_json(options = {})
    json = nil
    
    if options[:id_name_only]
      json = {:id => id, :name => name}
    else
      srand(id) unless new_record?
      # spoof the likes and comments attribs for now
      # explicitly include name b/c it's a method call on some objects
      json = super(options).merge(:likes => like_count, :comments => comment_count, :views => view_count, :name => name, :topic => topic)
    end

    # add comments if requested
    json.merge!(:commentPreview => comment_preview_as_json) if options[:comment_preview]

    json
  end

end