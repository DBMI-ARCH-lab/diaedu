class CreateDiaeduKbObjs < ActiveRecord::Migration
  def change
    create_table :diaedu_kb_objs do |t|
      t.string :type, :null => false
      t.string :name, :null => true # glyprobs don't have names
      t.text :description, :null => false
      t.boolean :approved, :null => false, :default => false
      t.integer :topic_id, :null => true
      t.integer :view_count, :null => false, :default => 0
      t.integer :event_id, :null => true
      t.string :evaluation, :null => true

      t.timestamps
    end

    add_index :diaedu_kb_objs, :topic_id, :unique => true
    add_foreign_key :diaedu_kb_objs, :topics
    add_foreign_key :diaedu_kb_objs, :diaedu_events, :column => 'event_id'
  end
end
