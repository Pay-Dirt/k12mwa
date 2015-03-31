class ExaminationsController < ApplicationController
  before_action :check_authentication
  before_action :set_school
  
  def index
    @examination  = @school.examinations.all
    render json: {success:{success:"yes",type:"success",display:"no"},data:{examination:@examination}}
  end
  
  def create
    @examination = @school.examinations.new(examination_params)
    if @examination.save
      render json: {success:{success:"yes",type:"success",display:"no"},data:{examination:@examination}}
    else
      render json: {}
    end 
  end
  
  def destroy
    @examination = @school.examinations.find(params[:id])
    if @examination.destroy
      render json: {}
    else
      render json: {}
    end
  end
  
  private
  def examination_params
    params.require(:examination).permit(:name)
  end
end
