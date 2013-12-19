# implements methods and scopes related to approving objects
module Diaedu
  module Concerns
    module Approvable
      extend ActiveSupport::Concern

      included do

        scope(:approved, -> { where(:approved => true) })

      end
    end
  end
end