class StudentsController < ApplicationController
  before_action :set_school
  def index
    if(params[:classroom_id] && params[:section_id])
      @students = @school.classrooms.find(params[:classroom_id]).sections.find(params[:section_id]).students
      render json: @students
    end
  end
  
  private
  def set_school
    @school = School.find(params[:school_id])
  end
end
