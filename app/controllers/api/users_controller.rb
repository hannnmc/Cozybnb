class Api::UsersController < ApplicationController
  wrap_parameters include: User.attribute_names + ['password' , 'firstName', 'lastName', 'birthDate', 'phoneNumber']

  def show
    @user = User.find(user_params[:id])
    render :show
  end

  def create 
    @user = User.create(user_params)
    if @user.save 
      render :show
    else 
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    @user = User.find(current_user.id)
    if @user.update(user_params)
      @user.save
      render :show
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def index 
    @users = User.all
    render :index
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :first_name, :photo, :last_name, :birth_date, :phone_number, :about)
  end
end
