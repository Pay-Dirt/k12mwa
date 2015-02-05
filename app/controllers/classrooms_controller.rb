class ClassroomsController < ApplicationController
  before_action :set_school
  
  def index
    @classrooms = @school.classrooms.all
    if @classrooms.length <= 0
      render json: '{"classrooms":"none"}'
    else
      render json: @classrooms
    end
  end
  
  def create
    @classroom = @school.classrooms.new(classroom_params)
    if @classroom.save
      create_initial_section
      render json: @classroom
    else
      render json: '{"success":"no"}'
    end
  end
  
  private
  def set_school
    @school = School.find(params[:school_id])
  end
  
  def classroom_params
    params.require(:classroom).permit(:classroom_number)
  end
  
  def create_initial_section
    @section = @classroom.sections.new(section: "A")
    @section.save
  end
end
