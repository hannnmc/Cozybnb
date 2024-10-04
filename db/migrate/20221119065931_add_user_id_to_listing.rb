class AddUserIdToListing < ActiveRecord::Migration[7.0]
  def change
    add_reference :listings, :user, foreign_key: true
  end
end
