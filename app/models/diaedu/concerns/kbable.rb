# contains assorted methods common to all kb obj classes
module Diaedu::Concerns::Kbable
  extend ActiveSupport::Concern

  def increment_view_count!
    increment!(:view_count)
  end
end
