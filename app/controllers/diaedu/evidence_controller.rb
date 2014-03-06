module Diaedu
  class EvidenceController < ::ApplicationController

    def create
      sleep(1)
      render(:json => {id: 10})
    end

  end
end