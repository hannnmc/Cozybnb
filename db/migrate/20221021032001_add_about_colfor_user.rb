class AddAboutColforUser < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :about, :string
  end
end
