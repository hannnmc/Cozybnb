class Api::UsersController < ApplicationController
  wrap_parameters include: User.attribute_names + ['password' , 'firstName', 'lastName', 'birthDate']

  def create
    # bdate = DateTime.parse(user_params.birthdate)
    @user = User.new(user_params)
    if @user.save
      login!(@user)
      render :show
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end 
  end

  def show
    @user = User.find(user_params[:id])
    render :show
  end

  def update 
    @user = User.find(current_user.id)
    if @user.update(user_params)
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
    params.require(:user).permit(:email, :password, :first_name, :photo, :last_name, :birth_date, :about)
  end
end
