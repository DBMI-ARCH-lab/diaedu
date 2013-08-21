class CreateDiaeduGlyprobs < ActiveRecord::Migration
  def change
    create_table :diaedu_glyprobs do |t|
      t.string :evaluation, :null => false
      t.integer :event_id, :null => false
      t.text :description, :null => false
      t.foreign_key :diaedu_events, :column => 'event_id'

      t.timestamps
    end
    add_index :diaedu_glyprobs, :evaluation
    
  end
end
