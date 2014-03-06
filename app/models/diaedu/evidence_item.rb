module Diaedu
  class EvidenceItem < ActiveRecord::Base
    has_attached_file :file

    before_validation(:add_http_if_missing)
    before_validation(:set_kind_if_file_present)

    validates(:title, :presence => true, unless: ->(i) {i.temporary})
    validates(:url, :presence => true, :if => ->(i) {i.kind == 'link'})
    validates(:url, :format => %r@\A(https?|ftp)://(-\.)?([^\s/?\.#-]+\.?)+(/[^\s]*)?\z@i, :if => ->(i) {i.kind == 'link'})

    attr_accessor(:temporary)

    # combined error messages
    def error_messages
      errors.full_messages.join(', ')
    end

    private
      def set_kind_if_file_present
        self.kind = 'file' if file.present?
      end

      def add_http_if_missing
        self.url = "http://#{url}" unless url =~ %r@\A(https?|ftp)://@
      end
  end
end
