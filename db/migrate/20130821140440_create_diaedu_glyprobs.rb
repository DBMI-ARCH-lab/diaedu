class CreateDiaeduGlyprobs < ActiveRecord::Migration
  def change
    create_table :diaedu_glyprobs do |t|
      t.string :evaluation
      t.integer :event_id
      t.text :description

      t.timestamps
    end
    add_index :diaedu_glyprobs, :evaluation
    add_index :diaedu_glyprobs, :event_id
  end
end
