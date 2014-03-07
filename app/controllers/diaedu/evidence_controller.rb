module Diaedu
  class EvidenceController < ::ApplicationController

    def create
      sleep(1)
      # remove old orphan items
      EvidenceItem.where(:kb_obj_id => nil).where('created_at < ?', 2.hours.ago).destroy_all

      # create new EvidenceItem and attach file
      @item = EvidenceItem.create!(params.require(:evidence_item).permit(:file).merge(:temporary => true))

      # return id of new item
      render(:json => {id: @item.id})
    end

  end
end