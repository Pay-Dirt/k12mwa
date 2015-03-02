class StudentsController < ApplicationController
  before_action :set_school
  def index
    if(params[:classroom_id] && params[:section_id])
      @students = @school.classrooms.find(params[:classroom_id]).sections.find(params[:section_id]).students
      render json: {success:{success:"yes",display:"no",type:"success"},data:{students:@students}}
    end

  end
  
  private
end
