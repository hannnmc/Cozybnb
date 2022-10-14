json.user do
    json.extract! @user, :id, :email, :first_name, :last_name, :birth_date, :photo, :created_at, :updated_at
    json.photoUrl @user.photo.url
end