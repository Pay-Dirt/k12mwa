class DefaultMainSubjectsController < ApplicationController
  before_action :check_authentication
  
  def index
    @default_main_subjects = DefaultMainSubject.where(classroom_number:params[:classroom_number])
    @default_main_subjects.each do |dms|
      dss = dms.default_sub_subjects.all
      dms.sub_subjects = Array.new
      dss.each do |d|
        dms.sub_subjects.push(d)
      end
    end
    render json: {success:{success:"yes",display:"no",type:"success"},data:{default_main_subjects:@default_main_subjects.as_json(:methods => :sub_subjects)}}
  end
  
end
