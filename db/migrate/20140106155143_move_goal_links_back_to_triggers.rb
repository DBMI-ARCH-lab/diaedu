class MoveGoalLinksBackToTriggers < ActiveRecord::Migration
  def up

    execute("UPDATE diaedu_kb_links l SET obj1_id = l2.obj1_id
      FROM diaedu_kb_objs b, diaedu_kb_links l2
      WHERE l.obj1_id = b.id AND b.type = 'Diaedu::Barrier' AND l2.obj2_id = b.id")

  end

  def down
  end
end
