class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :email, null: false
      t.string :password_digest, null: false
      t.string :session_token, null: false
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.date :birth_date, null: false
      t.string :phone_number, limit: 10

      t.timestamps
    end
    add_index :users, :email, unique: true
    add_index :users, :session_token, unique: true
    add_index :users, :phone_number, unique: true
  end
end
