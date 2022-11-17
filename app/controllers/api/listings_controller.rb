class Api::ListingsController < ApplicationController
    wrap_parameters include: Listing.attribute_names + ["photos", "dedicatedWorkspace", "propType", "usersId", "petsAllowed" ]

    def index
        @listings = Listing.all
        @listings = @listings.where(guests: guests_range) if guests_range
        @listings = @listings.where(price: price_range) if price_range
        render :index
    end
    
    def show

        @listing = Listing.find(params[:id])
    end

    def create
        @listing = Listing.new(listing_params)
        @listing.users_id = current_user.id
        if @listing.save
            render :show
        else 
            render json: { errors: @listing.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy 
        @listing = Listing.find(params[:id])
        @listing.destroy if current_user.id == @listing.users_id
        render :show 
    end

    private

    def listing_params
        params.require(:listing).permit(
            :title,
            :description, 
            :lat, 
            :lng, 
            :price,
            :guests, 
            :beds,
            :bedrooms,
            :baths,
            :address,
            :city,
            :state,
            :country,
            :wifi,
            :prop_type,
            :dedicated_workspace,
            :pets_allowed,
            :kitchen,
            :parking,
            :photos
        )
    end
    
    def guests_range
        return nil unless params[:min_guests] && params[:max_guests]
        params[:min_guests]..params[:max_guests]
    end

    def price_range
        return nil unless params[:min_price] && params[:max_price]
        params[:min_price]..params[:max_price]
    end
end