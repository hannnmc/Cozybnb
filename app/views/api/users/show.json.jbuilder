json.user do
    json.extract! @user, :id, :email, :first_name, :last_name, :birth_date, :photo, :created_at, :updated_at

    if @user.photo.attached?
        json.photo_url url_for(@user.photo) 
      else
        json.photo_url "/user_placeholder.png"
      end     
end