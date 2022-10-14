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
  json.photo_url url_for(listing.photo) 
else
  json.photo_url "/listing_placeholder.png"
end
