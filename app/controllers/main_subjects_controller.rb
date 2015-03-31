class MainSubjectsController < ApplicationController
  before_action :check_authentication
  before_action :set_school
  before_action :set_classroom
  
  def index
    @main_subjects = @classroom.main_subjects
    render json: {success:{success:"yes",type:"success",display:"no"},data:{main_subjects:@main_subjects}}
  end
  
  def create
    @main_subjects = @classroom.main_subjects.new(main_subject_params)
    if @main_subjects.save
      render json: {success:{success:"yes",display:"yes",type:"success",message:"Subject successfully added"},data:{main_subjects:@main_subjects}}
    else
      render json: {success:{success:"no",display:"yes",type:"error",message:"failed"},data:{main_subjects:@main_subjects}}
    end
  end
  
  private
  
  def set_classroom
    @classroom = @school.classrooms.find(params[:classroom_id])
  end
  
  def main_subject_params
    params.require(:main_subject).permit(:name,:max_marks,:is_graded)
  end
end