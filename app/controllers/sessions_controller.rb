class SessionsController < ApplicationController
  
  def create
    user = User.find_by(mobile: params[:session][:mobile])
    if user && user.authenticate(params[:password])
      log_in user
      render json: {success:{success:"yes",display:"yes",type:"success",message:"You have logged in successfully."}, data:{session: user}}
    else
      render json: {success:{success:"no",display:"yes",type:"error",message:"Invalid username or password."}}
    end
  end
  
  def destroy
    log_out
    render json: {}
  end
  
  def checklogin
    if logged_in?
      msg = "Welcome " + current_user.username
      render json: {success:{success:"yes",type:"success",message:msg,display:"yes"},data:{session:current_user}}
    else
        render json: {success:{success:"no",type:"authFail",message:"Authentication Failed",display:"yes"},data:{}}
    end
  end
end
