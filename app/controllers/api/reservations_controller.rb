class Api::ReservationsController < ApplicationController

    wrap_parameters include: Reservation.attribute_names + ['listingId' , 'userId', 'startDate', 'endDate']

    def create
        @reservation = Reservation.new(reservation_params)
        @reservation[:user_id] = current_user.id

        if @reservation.save!
            render :show
        else
            render json: @reservation.errors.full_messages, status: 422
        end
    end

    def destroy 
        @reservation = Reservation.find(params[:id])
        @reservation.destroy if current_user.id == @reservation.user_id
        render :show
    end

    def index 
        reservations = Reservation.all
        
        if params[:userId]
           @reservations = reservations.where(user_id: params[userId])
        end
        @reservations = reservations.includes(:user)

        render :index
    end

    private

    def reservation_params 
        params.require(:reservation).permit(:listing_id, :guests, :start_date, :end_date, :total, :days)
    end


end

