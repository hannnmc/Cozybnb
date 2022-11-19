class FixListingIdReviews < ActiveRecord::Migration[7.0]
  def change
    remove_column :reviews, :listings_id
  end
end
