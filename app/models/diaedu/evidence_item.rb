module Diaedu
  class EvidenceItem < ActiveRecord::Base
    has_attached_file :file

    before_validation(:set_kind_if_file_present)

    private
      def set_kind_if_file_present
        self.kind = 'file' if file.present?
      end
  end
end
