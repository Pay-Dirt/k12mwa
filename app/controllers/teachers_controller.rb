class TeachersController < ApplicationController
  before_action :set_school
  before_action :set_teacher, only: [:update,:destroy]
  
  #schools/:school_id/teachers, list all the schools
  def index
    @teachers = @school.teachers.all
    render json: @teachers
  end
  
  #schools/:school_id/teachers/:id
  def show
    @teacher = @school.teachers.find(params[:id])
    render json: @teacher
  end
  
  #schools/:school_id/teachers/, post json data
  def create
    @teacher = @school.teachers.new(teacher_params)
    if @teacher.save
      render json: @teacher
    else
      render json: '{"success":"no"}'
    end
  end
  
  def update
    @teacher.update(teacher_params)
    render json: @teacher
  end
  def destroy
    @teacher.destroy
    render json: @teacher
  end
  private
  
  #this will set school before any action on teacher as teacher belongs to a school
  ##note we need to set_schhol by login details
  def set_school
    @school = School.find(params[:school_id])
  end
  
  def set_teacher
    @teacher = @school.teachers.find(params[:id])
  end
  
  #permit from here the params which are expected by active record
  def teacher_params
    params.require(:teacher).permit(:name,:fathers_name,:contact,:email)
  end
end
