class CreateBarriersForExistingTriggerGoalCombinations < ActiveRecord::Migration
  def up
    # for each trigger X, we need to insert a barrier so that it beccomes trigger X => new barrier => [goal X1, goal X2, ...]
    # get all triggers
    q = execute("SELECT * FROM diaedu_kb_objs o WHERE o.type = 'Diaedu::Trigger'")

    q.each do |trigger|

      # create a new barrier and get id
      name = connection.quote(trigger['name'])[1...-1]
      i = execute("INSERT INTO diaedu_kb_objs(type, name, description, approved, created_at, updated_at)
        VALUES ('Diaedu::Barrier', 'Barrier for #{name}', 'Description for barrier for #{name}', '#{trigger['approved']}', now(), now()) returning id")
      barrier_id = i[0]['id']

      # create the trigger => barrier link
      execute("INSERT INTO diaedu_kb_links(obj1_id, obj2_id, created_at, updated_at) VALUES (#{trigger['id']}, #{barrier_id}, now(), now())")

      # update the old trigger => goal links to use barrier instead
      execute("UPDATE diaedu_kb_links SET obj1_id = #{barrier_id} WHERE obj1_id = #{trigger['id']}")

    end
  end

  def down
  end
end
