class CreateDiaeduTriggerGoals < ActiveRecord::Migration
  def change
    create_table :diaedu_trigger_goals do |t|
      t.integer :trigger_id
      t.integer :goal_id
      t.foreign_key :diaedu_triggers, :column => 'trigger_id'
      t.foreign_key :diaedu_goals, :column => 'goal_id'

      t.timestamps
    end
  end
end
