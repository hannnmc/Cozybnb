class Api::ListingsController < ApplicationController
    wrap_parameters include: User.attribute_names + [:photo], format: :multipart_form

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

        if @listing.save
            render :show
        else 
            render json: { errors: @listing.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy 
        @listing = Listing.find(params[:id])
        @listing.destroy if current_user.id == @listing.user_id
        render :index 
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
            :bedrooms,
            :beds,
            :bedrooms,
            :beds,
            :baths,
            :address,
            :city,
            :state,
            :country,
            :wifi,
            :photo
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