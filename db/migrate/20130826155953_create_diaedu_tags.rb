class CreateDiaeduTags < ActiveRecord::Migration
  def change
    create_table :diaedu_tags do |t|
      t.string :name, :null => false
      t.integer :taggable_id, :null => false
      t.string :taggable_type, :null => false

      t.timestamps
    end
    add_index :diaedu_tags, :name, :unique => true
    add_index :diaedu_tags, :taggable_id
    add_index :diaedu_tags, [:taggable_id, :taggable_type], :unique => true
  end
end
