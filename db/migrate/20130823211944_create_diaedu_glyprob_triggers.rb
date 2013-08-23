class CreateDiaeduGlyprobTriggers < ActiveRecord::Migration
  def change
    create_table :diaedu_glyprob_triggers do |t|
      t.integer :glyprob_id, :null => false
      t.integer :trigger_id, :null => false
      
      t.foreign_key :diaedu_glyprobs, :column => 'glyprob_id'
      t.foreign_key :diaedu_triggers, :column => 'trigger_id'

      t.timestamps
    end
  end
end
