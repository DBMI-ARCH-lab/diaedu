class CreateDiaeduEvidenceItems < ActiveRecord::Migration
  def change
    create_table :diaedu_evidence_items do |t|
      t.integer :kb_obj_id
      t.string :kind, :null => false
      t.string :title
      t.text :url
      t.string :filename

      t.timestamps
    end
    add_index :diaedu_evidence_items, :kb_obj_id
    add_foreign_key :diaedu_evidence_items, :diaedu_kb_objs, :column => 'kb_obj_id'
  end
end
