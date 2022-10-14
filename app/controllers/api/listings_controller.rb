class Api::ListingsController < ApplicationController
    wrap_parameters include: User.attribute_names + []

    def index
        @listings = Listing.all
        @listings = @listings.where(seating: seating_range) if seating_range
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
            :wifi,
            :photo
        )
    end
    
    def seating_range
        return nil unless params[:min_seating] && params[:max_seating]
        params[:min_seating]..params[:max_seating]
    end


end