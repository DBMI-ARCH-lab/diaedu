class AddAttachmentFileToEvidenceItems < ActiveRecord::Migration
  def self.up
    change_table :diaedu_evidence_items do |t|
      t.attachment :file
    end
  end

  def self.down
    drop_attached_file :diaedu_evidence_items, :file
  end
end
