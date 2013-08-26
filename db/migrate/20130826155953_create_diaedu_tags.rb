class CreateDiaeduTags < ActiveRecord::Migration
  def change
    create_table :diaedu_tags do |t|
      t.string :name, :null => false

      t.timestamps
    end
    add_index :diaedu_tags, :name, :unique => true
  end
end
