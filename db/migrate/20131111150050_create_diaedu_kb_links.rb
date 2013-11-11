class CreateDiaeduKbLinks < ActiveRecord::Migration
  def change
    create_table :diaedu_kb_links do |t|
      t.integer :obj1_id, :null => false
      t.integer :obj2_id, :null => false

      t.timestamps
    end
    add_index :diaedu_kb_links, :obj1_id
    add_index :diaedu_kb_links, :obj2_id
    add_foreign_key :diaedu_kb_links, :diaedu_kb_objs, :column => 'obj1_id'
    add_foreign_key :diaedu_kb_links, :diaedu_kb_objs, :column => 'obj2_id'
  end
end
