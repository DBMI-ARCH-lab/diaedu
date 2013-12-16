# implements methods and scopes related to approving objects
module Diaedu::Concerns::Approvable
  extend ActiveSupport::Concern

  included do

    scope(:approved, -> { where(:approved => true) })

  end
end
