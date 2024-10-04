class Api::ReviewsController < ApplicationController

    wrap_parameters include: Review.attribute_names + ['listingId' , 'userId']

    def create
        @review = Review.new(review_params)
        @review[:user_id] = current_user.id
        @review[:rating] = ((
        (review_params[:cleanliness]).to_i +
        (review_params[:accuracy]).to_i + 
        (review_params[:communication]).to_i + 
        (review_params[:location]).to_i + 
        (review_params[:checkin]).to_i + 
        (review_params[:value]).to_i)/ 6.0)

        if @review.save
            render :show
        else
            render json: @review.errors.full_messages, status: 422
        end
    end

    def destroy 
        @review = Review.find(params[:id])
        @review.destroy if current_user.id == @review.user_id
        render :show
    end

    def index 
        @reviews = Review.all
        render :index
    end

    private

    def review_params 
        params.require(:review).permit(:body, :rating, :listing_id, :cleanliness, :accuracy, :communication, :location, :checkin, :value)
    end


end

