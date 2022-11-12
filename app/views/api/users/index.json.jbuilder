json.users do
  @users.each do |user|
    json.set! user.id do
      json.partial! 'api/users/user', user: user
      if user.photo.attached?
        json.photo_url user.photo.url
      else
        json.photo_url "https://thecozybnb-dev.s3.amazonaws.com/default_user_photo.png"
    end
    end
  end
end
  