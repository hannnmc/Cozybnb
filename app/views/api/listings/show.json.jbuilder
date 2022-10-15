json.listing do
    json.partial! '/api/listinges/listing', listing: @listing
  end
  
  @listing.reviews.includes(:user).each do |review|
    json.reviews do
      json.set! review.id do
        json.partial! 'api/reviews/review', review: review
      end
    end
  
  #   json.users do
  #     json.set! review.user_id do
  #       json.partial! 'api/users/user', user: review.user
  #     end
  #   end
  # end