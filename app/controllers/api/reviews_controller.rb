class Api::ReviewsController < ApplicationController

    wrap_parameters include: Review.attribute_names + ['listingId' , 'userId']

    def create
        @review = Review.new(review_params)
        @review[:user_id] = current_user.id
        # debugger
        if @review.save!
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
        reviews = Review.all
        
        if params[:userId]
           @reviews = reviews.where(user_id: params[userId])
        end
        @reviews = reviews.includes(:user)

        render :index
    end

    private

    def review_params 
        params.require(:review).permit(:body, :rating, :listing_id)
    end


end

