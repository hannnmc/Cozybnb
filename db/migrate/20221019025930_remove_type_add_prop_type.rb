class RemoveTypeAddPropType < ActiveRecord::Migration[7.0]
  def change
    remove_column :listings, :type, :string
    add_column :listings, :prop_type, :string, null: false
  end
end
