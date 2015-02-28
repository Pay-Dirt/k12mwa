module SessionsHelper
  
  def current_user
    @current_user ||= User.find_by(id: session[:user_id])
  end
  
  def log_in(user)
    session[:user_id] = user.id
    session[:school_id] = user.school_id
  end
  
  def logged_in?
    !current_user.nil?
  end
  
  def check_authentication
    if !logged_in?
      render json: {success:"no",error:"authFail",display:"yes",message:"Authentication Failed!"}
    end
  end
  
  def log_out
    session.delete(:user_id)
    session.delete(:school_id)
    @current_user = nil
  end
  
 #this function will set the school before performing any actions
 def set_school
   @school ||= School.find(session[:school_id])
 end
end
