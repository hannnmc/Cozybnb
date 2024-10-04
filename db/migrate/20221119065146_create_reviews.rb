class CreateReviews < ActiveRecord::Migration[7.0]
  def change
    create_table :reviews do |t|
      t.text :body, null: false
      t.integer :rating, null: false
      t.references :users, foreign_key: true, null: false
      t.references :listings, foreign_key: true, null: false
      t.timestamps
    end
  end
end
