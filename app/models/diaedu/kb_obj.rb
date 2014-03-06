module Diaedu
  class KbObj < ActiveRecord::Base
    include Concerns::Approvable
    include Concerns::Filterable
    include Concerns::Commentable

    SUBTYPES = [:glyprobs, :triggers, :barriers, :goals]

    has_many(:outlinks, :class_name => 'Diaedu::KbLink', :foreign_key => 'obj1_id', :dependent => :destroy, :autosave => true)
    has_many(:children, :through => :outlinks)
    has_many(:inlinks, :class_name => 'Diaedu::KbLink', :foreign_key => 'obj2_id', :dependent => :destroy, :autosave => true)
    has_many(:parents, :through => :inlinks)

    has_many(:taggings, :class_name => 'Diaedu::Tagging', :foreign_key => 'obj_id')
    has_many(:tags, :through => :taggings)

    has_many(:evidence_items, :class_name => 'Diaedu::EvidenceItem', :foreign_key => 'kb_obj_id', :dependent => :destroy, :autosave => true)

    accepts_nested_attributes_for(:taggings, :allow_destroy => true)
    accepts_nested_attributes_for(:evidence_items, :allow_destroy => true)

    before_validation(:normalize_fields)

    scope(:recent_unapproved, ->(count) { order('created_at DESC').where(:approved => false).limit(count) })

    def self.admin_route_key
      "kb_admin_#{model_name.singular_route_key}"
    end

    # associates with parents with the given IDs
    def inlink_ids=(ids)
      ids.each{|id| inlinks.build(:obj1_id => id)}
    end

    def increment_view_count!
      increment!(:view_count)
    end

    def unqualified_type
      type.gsub('Diaedu::', '')
    end

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

    private
      # trims whitespace, etc.
      def normalize_fields
        self.description = description.strip unless description.blank?
      end

  end
end
