class AddTopicIdToObjs < ActiveRecord::Migration
  def change
    %w(glyprobs triggers goals).each do |t|
      add_column :"diaedu_#{t}", :topic_id, :integer
      add_index :"diaedu_#{t}", :topic_id, :unique => true
      add_foreign_key :"diaedu_#{t}", :topics
    end
  end
end
