json.user do
    json.extract! @user, :id, :email, :first_name, :last_name, :birth_date, :photo, :about, :phone_number, :created_at, :updated_at

    if @user.photo.attached?
        # json.photoUrl "https://thecozybnb-dev.s3.amazonaws.com/profile_icon.jpg"
        json.photo_url @user.photo.url
        # json.photoUrl url_for(@user.photo) 
    else
        json.photo_url "https://thecozybnb-dev.s3.amazonaws.com/default_user_photo.png"
    end
end