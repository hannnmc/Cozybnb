class ChangeUsersToUserListing < ActiveRecord::Migration[7.0]
  def change
    remove_column :listings, :users_id
  end
end
