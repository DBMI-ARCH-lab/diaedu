class AddViewCountToKbObjs < ActiveRecord::Migration
  def change
    %w(glyprobs triggers goals).each do |t|
      add_column :"diaedu_#{t}", :view_count, :integer, :null => false, :default => 0
    end
  end
end
