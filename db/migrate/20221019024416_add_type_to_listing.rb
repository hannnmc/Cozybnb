class AddTypeToListing < ActiveRecord::Migration[7.0]
  def change
    add_column :listings, :type, :string, null: false
  end
end
