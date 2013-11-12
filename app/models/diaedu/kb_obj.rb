module Diaedu
  class KbObj < ActiveRecord::Base
    include Concerns::Approvable
    include Concerns::Filterable
    include Concerns::Commentable
    include Concerns::Jsonable
    include Concerns::Kbable

    SUBTYPES = [:glyprobs, :triggers, :goals]

    has_many(:outlinks, :class_name => 'Diaedu::KbLink', :foreign_key => 'obj1_id', :dependent => :destroy, :autosave => true)
    has_many(:children, :through => :outlinks)
    has_many(:inlinks, :class_name => 'Diaedu::KbLink', :foreign_key => 'obj2_id', :dependent => :destroy, :autosave => true)
    has_many(:parents, :through => :inlinks)

    has_many(:taggings, :class_name => 'Diaedu::Tagging', :foreign_key => 'obj_id')
    has_many(:tags, :through => :taggings)

    accepts_nested_attributes_for(:taggings, :allow_destroy => true)

    before_validation(:normalize_fields)

    private
      # trims whitespace, etc.
      def normalize_fields
        self.description = description.strip unless description.blank?
      end

  end
end
