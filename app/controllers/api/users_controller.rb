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

  private

  def user_params
    params.require(:user).permit(:email, :password, :first_name, :last_name, :birth_date)
  end
end
