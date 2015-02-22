class StudentsController < ApplicationController
  before_action :set_school
  
  def index
    @students = @school.students.all
    render json: @students
  end
  
  private
  def set_school
    @school = School.find(params[:school_id])
  end
end
