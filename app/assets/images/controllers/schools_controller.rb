class SchoolsController < ApplicationController
  
  before_action :set_school, only: [:show]
  
  def index
    @schools = School.all
  end
  
  def new
    render json: School.new
  end
  
  def show
  end
  
  def create
    @school = School.new(school_params)
    if @school.save
      render @school
    else
      render json: "{'error':'unable to create school'}"
    end
  end
  
  private
  def set_school
    @school = School.find(params[:id])
  end
  
  def school_params
    params.require(:school).permit(:name,:locality,:city,:username)
  end
end
