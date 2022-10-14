json.listings({})

json.listings do
  @benches.each do |listing|
    json.set! listing.id do
      json.partial! 'api/listings/listing', listing: listing
    end
  end
end
