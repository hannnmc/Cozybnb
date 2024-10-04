class CreateReservations < ActiveRecord::Migration[7.0]
  def change
    create_table :reservations do |t|
      t.references :listing, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.integer :guests, null: false
      t.datetime :start_date, null: false
      t.datetime :end_date, null: false
      t.float :total, null: false
      t.timestamps
    end
  end
end
