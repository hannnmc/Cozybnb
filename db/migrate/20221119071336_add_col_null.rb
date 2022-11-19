class AddColNull < ActiveRecord::Migration[7.0]
  def change
    change_column_null :listings, :user_id, false
    change_column_null :reviews, :user_id, false
    change_column_null :reviews, :listing_id, false
  end
end
