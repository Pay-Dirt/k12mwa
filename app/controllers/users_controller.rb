class UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    if @user.save
      render json: @user
    else
      render json: {}
    end
  end
  
  def destroy
    
  end
  
  private
  def user_params
    params.permit(:username,:mobile,:password,:password_confirmation)
  end
end
