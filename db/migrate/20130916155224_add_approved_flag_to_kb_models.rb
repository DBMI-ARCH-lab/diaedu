class AddApprovedFlagToKbModels < ActiveRecord::Migration
  def up
    # add the flags
    add_column(:diaedu_glyprobs, :approved, :boolean, :default => false, :null => false)
    add_column(:diaedu_triggers, :approved, :boolean, :default => false, :null => false)
    add_column(:diaedu_goals, :approved, :boolean, :default => false, :null => false)

    # set all existing objs to approved
    %w(glyprobs triggers goals).each do |t|
      execute("UPDATE diaedu_#{t} SET approved = 't'")
    end
  end

  def down
    remove_column(:diaedu_glyprobs, :approved)
    remove_column(:diaedu_triggers, :approved)
    remove_column(:diaedu_goals, :approved)
  end
end
