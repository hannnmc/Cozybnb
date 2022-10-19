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
  :wifi
  
if listing.photo.attached?
  json.photo_url listing.photo.url
  # json.photoUrl "https://thecozybnb-dev.s3.amazonaws.com/listing1/photo1.jpg"
  # json.photoUrl @user.photo.url

else
  json.photo_url "/listing_placeholder.png" 
end
    
# json.photoUrl "https://thecozybnb-dev.s3.amazonaws.com/listing1/photo1.jpg" 