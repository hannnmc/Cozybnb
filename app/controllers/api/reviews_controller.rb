class Api::ReviewsController < ApplicationController

    wrap_parameters include: Review.attribute_names + ['listingId' , 'userId']

    def create
        @review = Review.new(review_params)
        @review[:user_id] = current_user.id
        @review[:rating] = (
        review_params[:cleanliness] +
        review_params[:accuracy] + 
        review_params[:communication] + 
        review_params[:location] + 
        review_params[:checkin] + 
        review_params[:value]) / 6
        # debugger
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
        @reviews = Review.all
        # debugger
        # if params[:userId]
        #     @reviews = reviews.where(user_id: params[userId])
        # end
        # @reviews = reviews.includes(:user)
        render :index
    end

    private

    def review_params 
        params.require(:review).permit(:body, :rating, :listing_id, :cleanliness, :accuracy, :communication, :location, :checkin, :value)
    end


end

