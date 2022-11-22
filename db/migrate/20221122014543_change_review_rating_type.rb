class ChangeReviewRatingType < ActiveRecord::Migration[7.0]
  def change
    remove_column :reviews, :rating
    add_column :reviews, :rating, :float, null: false
  end
end
