class CreateDiaeduTaggings < ActiveRecord::Migration
  def change
    create_table :diaedu_taggings do |t|
      t.integer :tag_id, :null => false
      t.integer :taggable_id, :null => false
      t.string :taggable_type, :null => false
      t.foreign_key :diaedu_tags, :column => 'tag_id'

      t.timestamps
    end
    add_index :diaedu_taggings, :taggable_id
    add_index :diaedu_taggings, [:tag_id, :taggable_id, :taggable_type], :unique => true, :name => 'taggings_keys_unique'
  end
end
