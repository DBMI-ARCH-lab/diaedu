class CreateDiaeduGoals < ActiveRecord::Migration
  def change
    create_table :diaedu_goals do |t|
      t.string :name, :null => false
      t.text :description, :null => false

      t.timestamps
    end
    add_index :diaedu_goals, :name
  end
end
