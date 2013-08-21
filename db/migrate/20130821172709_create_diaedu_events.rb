class CreateDiaeduEvents < ActiveRecord::Migration
  def change
    create_table :diaedu_events do |t|
      t.string :name, :null => false

      t.timestamps
    end
  end
end
