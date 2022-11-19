class FixUserIdReviews < ActiveRecord::Migration[7.0]
  def change
    remove_column :reviews, :users_id
  end
end
