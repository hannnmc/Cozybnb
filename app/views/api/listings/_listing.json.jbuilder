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
  :wifi,
  :photo

if listing.photo.attached?
    json.photoUrl listing.photo.url
else
    json.photoUrl "/listing_placeholder.png"
end