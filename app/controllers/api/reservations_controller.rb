class Api::ReservationsController < ApplicationController

    wrap_parameters include: Reservation.attribute_names + ['listingId' , 'userId', 'startDate', 'endDate']

    def create
        @reservation = Reservation.new(reservation_params)
        @reservation[:user_id] = current_user.id

        if @reservation.save
            render :show
        else
            render json: @reservation.errors.full_messages, status: 422
        end
    end

    def index 
        @reservations = Reservation.all
        render :index
    end

    private

    def reservation_params 
        params.require(:reservation).permit(:listing_id, :user_id, :guests, :start_date, :end_date, :total)
    end


end

