class CreateListings < ActiveRecord::Migration[7.0]
  def change
    create_table :listings do |t|
      t.string :title, null: false
      t.text :description, null: false
      t.float :lat, null: false
      t.float :lng, null: false
      t.integer :price, null: false
      t.integer :guests, null: false
      t.integer :bedrooms, null: false
      t.integer :beds, null: false
      t.integer :baths, null: false
      t.string :address, null: false
      t.string :city, null: false
      t.string :state, null: false
      t.boolean :wifi, null: false, default: false
      t.boolean :parking, null: false, default: false
      t.boolean :kitchen, null: false, default: false
      t.boolean :dedicated_workspace, null: false, default: false
      t.boolean :pets_allowed, null: false, default: true
      t.references :users, null: false, foreign_key: true

      t.timestamps
    end
  end
end
