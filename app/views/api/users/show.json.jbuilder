json.user do
    json.extract! @user, :id, :email, :first_name, :last_name, :birth_date, :created_at, :updated_at
end