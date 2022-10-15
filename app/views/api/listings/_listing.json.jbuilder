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
  :bedrooms,
  :beds,
  :baths,
  :address,
  :city,
  :state,
  :wifi
  
if listing.photo.attached?
  # json.photoUrl listing.photo.url
  json.photoUrl "https://thecozybnb-dev.s3.amazonaws.com/listing1/photo1.jpg"

else
  json.photoUrl "/listing_placeholder.png" 
end
    
# json.photoUrl "https://thecozybnb-dev.s3.amazonaws.com/listing1/photo1.jpg" 