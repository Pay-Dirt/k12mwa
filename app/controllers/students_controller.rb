class StudentsController < ApplicationController
  before_action :check_authentication
  before_action :set_school
  before_action :set_classroom, only: [:create]
  before_action :set_course, only: [:create]
  before_action :set_section, only: [:create]
  
  def index
    if(params[:classroom_id] && params[:section_id])
      @students = @school.classrooms.find(params[:classroom_id]).sections.find(params[:section_id]).students
      render json: {success:{success:"yes",display:"no",type:"success"},data:{students:@students}}
    end
  end
  
  def create
    @student = @school.students.new(student_params)
    @student.classroom = @classroom
    @student.section = @section
    @student.course = @course
    if @student.save
      render json: {success:{success:"yes",display:"no",type:"success"},data:{students:@student}}
    else
      render json: {success:{success:"no",display:"yes",type:"error",message:"Unable to save student"},data:{}}
    end
  end
  
  private
  
  def student_params
    params.require(:student).permit(:name)
  end
  
  def set_classroom
    @classroom = @school.classrooms.find(params[:classroom_id])
  end
  
  def set_course
    @course = @classroom.courses.find(params[:course_id])
  end
  
  def set_section
    @section = @classroom.sections.find(params[:section_id])
  end
end
