class CreateKbTopicCategories < ActiveRecord::Migration
  def up
    bot = User.where(:username => 'kbbot').first

    ['Glycemic Problems', 'Triggers', 'Goals'].each{|n| Category.where(:name => n).destroy_all}

    old_rl1 = SiteSetting.send("rate_limit_create_topic")
    old_rl2 = SiteSetting.send("rate_limit_create_post")
    SiteSetting.send("rate_limit_create_topic=", 0)
    SiteSetting.send("rate_limit_create_post=", 0)

    Category.create!(:name => "Glycemic Problems", :color => "85A8A4", :user_id => bot.id, :slug => 'glycemic-problems',
      :description => "Glycemic problems are patterns of problematic blood sugar levels, like 'High after breakfast'. This category is for discussion topics about glycemic problems.")
    Category.create!(:name => "Triggers", :color => "F58A33", :user_id => bot.id, :slug => 'triggers',
      :description => "Triggers are behaviors or habits that may be linked with glycemic problems, like 'I am inactive before dinner'. This category is for discussion topics about triggers.")
    Category.create!(:name => "Goals", :color => "C4D9EE", :user_id => bot.id, :slug => 'goals',
      :description => "Goals are ideas for ways to change problematic behavior and remedy glycemic problems, like 'Eat raw veggies'. This category is for discussion topics about goals.")

    SiteSetting.send("rate_limit_create_topic=", old_rl1)
    SiteSetting.send("rate_limit_create_post=", old_rl2)
  end

  def down
  end
end
