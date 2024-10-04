json.extract! listing, 
  :id, 
  :title,
  :description, 
  :lat, 
  :lng, 
  :price,
  :guests, 
  :bedrooms,
  :beds,
  :baths,
  :address,
  :city,
  :state,
  :country,
  :prop_type,
  :user_id,
  :wifi,
  :parking,
  :kitchen,
  :dedicated_workspace,
  :pets_allowed
  
if listing.photos.attached?
  json.photo_urls listing.photos.map { |photo| photo.url} 
  # json.photoUrl "https://thecozybnb-dev.s3.amazonaws.com/listing1/photo1.jpg"
  # json.photoUrl @user.photo.url

else
  json.photo_urls listing.photos.map{|photo| "https://thecozybnb-dev.s3.amazonaws.com/default_property_image.svg"} 
end


# json.photoUrl "https://thecozybnb-dev.s3.amazonaws.com/listing1/photo1.jpg" 