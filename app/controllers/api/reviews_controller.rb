class Api::ReviewsController < ApplicationController

    wrap_parameters include: Reviews.attribute_names + ['listingId' , 'userId']

    def create
        @review = review.new(review_params)
        @review[:user_id] = current_user.id
        
        if @review.save
            render :show
        else
            render json: @review.errors.full_messages, status: 422
        end
    end

    def destroy 
        @review = review.find(params[:id])
        @review.destroy if current_user.id == @review.user_id
        render :show
    end

    def index 
        reviews = Reservation.all
        
        if params[:userId]
           @reviews = reviews.where(user_id: params[userId])
        end
        @reviews = reviews.includes(:user)

        render :index
    end

    private

    def review_params 
        params.require(:reservation).permit(:body, :rating, :user_id)
    end


end

