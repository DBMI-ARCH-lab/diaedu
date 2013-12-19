class CreateKbUser < ActiveRecord::Migration
  def up
    # creates a dummy user that automated kb actions will be associated with
    User.create!(
      :username => 'kbbot',
      :name => 'Knowledge Base Robot',
      :email => 'diaedu-kb-bot@sassafrastech.com',
      :active => true,
      :username_lower => 'kbbot'
    )
  end

  def down
  end
end
