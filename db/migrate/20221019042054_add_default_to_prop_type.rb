class AddDefaultToPropType < ActiveRecord::Migration[7.0]
  def change
    change_column_default :listings, :prop_type, from: :null, to: "Entire home"
  end
end
