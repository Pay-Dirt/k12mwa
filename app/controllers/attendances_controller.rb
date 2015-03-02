class AttendancesController < ApplicationController
  before_action :check_authentication
  before_action :set_school
  before_action :set_section, only: [:create]
  before_action :set_student, only: [:update,:destroy]
  def index
    if params[:section_id]
      @attendance = @school.sections(params[:section_id]).attendances
      render json: {success:{success:"yes",display:"no",type:"success"},data:{attendance:@attendance}}
    elsif params[:student_id]
      @attendance = @school.students(params[:student_id]).attendances
      render json: {success:{success:"yes",display:"yes",type:"success"},data:{attendance:@attendance}}
    end
  end
  
  def create
    @attendance = @section.attendances.new(attendance_params)
    if attendance.save
      render json: {success:{success:"yes",display:"no",type:"success"},data:{attendance:@attendance}}
    else
      render json: {success:{success:"no",display:"no",type:"error"},data:{attendance:@attendance}}
    end
  end
  
  def update
   @attendance = @student.attendace 
  end
  
  private
  def set_section
    @section = @school.sections.find(params[:section_id])
  end
  
  def set_student
    @student = @school.find(params[:student_id])
  end
  
  def attendance_params
    params.require(:attendance).permit(:student_id,:attendance,:date)
  end
end