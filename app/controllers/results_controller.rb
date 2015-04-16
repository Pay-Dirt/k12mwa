class ResultsController < ApplicationController
  before_action :check_authentication
  before_action :set_school
  before_action :set_exam_schema
  before_action :set_result, only: [:show,:update]
  
  def index
    @result=@exam_schema.results
    render json: {success:{success:"yes",type:"success",display:"no"},data:{result:@result}}
  end
  
  def show
    
  end
  
  def create
    @result = @exam_schema.results.new(result_params)
    @result.student = @school.students.find(params[:student_id])
    if @result.save
      render json: {success:{success:"yes",type:"success",display:"yes",message:"marks successfully added"},data:{result:@result}}
    else
      render json: {}
    end
  end
  
  def update
    if @result.update(result_params)
      render json: {success:{success:"yes",type:"success",display:"yes",message:"marks successfully changed"},data:{result:@result}}
    else
      render json: {success:{success:"yes",type:"error",display:"yes",message:"try later"},data:{}}
    end
  end
  
  
  private
  
  def set_section
    @section = @school.classrooms.find(params[:classroom_id]).sections.find(params[:section_id])
  end
  
  def set_exam_schema
    @exam_schema = @school.examinations.find(params[:examination_id]).exam_schemas.find(params[:exam_schema_id])
  end
  
  def result_params
    params.require(:result).permit(:obtained_marks)
  end
  
  def set_result
    @result = @exam_schema.results.find(params[:id])
  end
  
end