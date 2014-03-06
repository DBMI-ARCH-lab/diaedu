module Diaedu
  class EvidenceController < ::ApplicationController

    def create
      # create new EvidenceItem and attach file
      @item = EvidenceItem.create!(params.require(:evidence_item).permit(:file).merge(:temporary => true))

      # return id of new item
      render(:json => {id: @item.id})
    end

  end
end