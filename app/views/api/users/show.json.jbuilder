json.user do
    json.extract! @user, :id, :email, :first_name, :last_name, :birth_date, :photo, :created_at, :updated_at

    if @user.photo.attached?
        json.photoUrl @user.photo.url
    else
        json.photoUrl "https://thecozybnb-dev.s3.amazonaws.com/default_user_photo.png"
    end
end