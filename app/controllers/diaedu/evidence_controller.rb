module Diaedu
  class EvidenceController < ::ApplicationController

    def create
      # create new EvidenceItem and attach file
      @item = EvidenceItem.create!(attribs = params.require(:evidence_item).permit(:file))

      # return id of new item
      render(:json => {id: @item.id})
    end

  end
end