class FixTaggingTable < ActiveRecord::Migration
  def change
    rename_column :diaedu_taggings, :taggable_id, :obj_id
    remove_column :diaedu_taggings, :taggable_type
  end
end
