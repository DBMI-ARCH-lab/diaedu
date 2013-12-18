class CopyKbDataToNewTables < ActiveRecord::Migration
  # copy objs of each type and remember new IDs
  def change
    new_ids = {}

    execute('DELETE FROM diaedu_kb_objs;')
    execute("SELECT setval('diaedu_kb_objs_id_seq', 1);")

    basic_fields = "description, created_at, updated_at, approved, topic_id, view_count"

    execute("INSERT INTO diaedu_kb_objs (id, type, #{basic_fields}, evaluation, event_id)
      SELECT id, 'Diaedu::Glyprob', #{basic_fields}, evaluation, event_id FROM diaedu_glyprobs")

    trigger_offset = execute('SELECT MAX(id) AS max_id FROM diaedu_kb_objs')[0]['max_id']

    execute("INSERT INTO diaedu_kb_objs (id, type, #{basic_fields}, name)
      SELECT id + #{trigger_offset}, 'Diaedu::Trigger', #{basic_fields}, name FROM diaedu_triggers")

    goal_offset = execute('SELECT MAX(id) AS max_id FROM diaedu_kb_objs')[0]['max_id']

    execute("INSERT INTO diaedu_kb_objs (id, type, #{basic_fields}, name)
      SELECT id + #{goal_offset}, 'Diaedu::Goal', #{basic_fields}, name FROM diaedu_goals")

    execute("INSERT INTO diaedu_kb_links (created_at, updated_at, obj1_id, obj2_id)
      SELECT created_at, updated_at, glyprob_id, trigger_id + #{trigger_offset} FROM diaedu_glyprob_triggers")

    execute("INSERT INTO diaedu_kb_links (created_at, updated_at, obj1_id, obj2_id)
      SELECT created_at, updated_at, trigger_id + #{trigger_offset}, goal_id + #{goal_offset} FROM diaedu_trigger_goals")

    # fix tagging ids (set type to dummy value for now)
    execute("UPDATE diaedu_taggings SET taggable_id = taggable_id + #{trigger_offset}, taggable_type = 'X' WHERE taggable_type = 'Diaedu::Trigger'")
    execute("UPDATE diaedu_taggings SET taggable_id = taggable_id + #{goal_offset}, taggable_type = 'Y' WHERE taggable_type = 'Diaedu::Goal'")
  end
end
