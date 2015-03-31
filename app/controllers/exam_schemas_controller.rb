class ExamSchemasController < ApplicationController
  before_action :check_authentication
  before_action :set_school
  before_action :set_examination
  before_action :set_exam_schema, only: [:update,:destroy]
  before_action :exam_schema_params, only: [:create]
  before_action :set_classroom
  def index
    @exam_schema = @examination.exam_schemas.where(classroom_id:params[:classroom_id])
      render json: {success:{success:"yes",type:"success",display:"yes",message:"ok"},data:{exam_schema:@exam_schema}}  
  end
 
  def create
    len  = @exam_schema_params.length
    @exam_schema_params.each do |exam_schema|
      @exam_schema = @examination.exam_schemas.new
      @exam_schema.classroom = @classroom
      @exam_schema.main_subject = @classroom.main_subjects.find(exam_schema[:id])
      if @exam_schema.save
        len = len -1
      end
    end
    if len == 0
      render json: {success:{success:"yes",type:"success",display:"yes",message:"ok"},data:{}}  
    else
      exam_schemas = @examination.exam_schemas
      exam_schemas.each do |e|
        e.destroy
      end
      render json: {success:{success:"no",type:"error",display:"yes",message:"failed"},data:{}}
    end
  end
  
  def update
    if @exam_schema.update(exam_schema_params)
      render json: {}
    else
      render json: {}
    end
  end
  
  def destroy
    if @exam_schema.destroy
      render json: {}
    else
      render json: {}
    end
  end
  
  private
  def set_classroom
    @classroom = @school.classrooms.find(params[:classroom_id])
  end
  def set_examination
    @examination = @school.examinations.find(params[:examination_id])
  end
  
  def set_exam_schema
    @exam_schema = @examination.exam_schemas.find(params[:id])
  end
  
  def exam_schema_params
    @exam_schema_params = params[:data]
  end
end
