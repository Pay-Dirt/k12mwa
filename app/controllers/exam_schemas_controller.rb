class ExamSchemasController < ApplicationController
  before_action :check_authentication
  before_action :set_school
  before_action :set_examination
  before_action :exam_schema_update_params, only: [:update]
  before_action :set_exam_schema, only: [:destroy,:update]
  before_action :exam_schema_params, only: [:create]
  before_action :set_classroom, only: [:show,:create]
  
  def index
    @exam_schemas = @examination.exam_schemas.where(classroom_id:params[:classroom_id])
    @exam_schemas.each do |exam_schema|
      @sub_subject = SubSubject.find(exam_schema.sub_subject_id)
      exam_schema.sub_subject_name = @sub_subject.name
    end
      render json: {success:{success:"yes",type:"success",display:"yes",message:"ok"},data:{exam_schema:@exam_schemas.as_json(:methods => :sub_subject_name)}}  
  end
 
  def create
    len  = @exam_schema_params.length
    @exam_schema_params.each do |exam_schema|
      @exam_schema = @examination.exam_schemas.new(exam_date: exam_schema[:exam_date],duration: exam_schema[:duration])
      @exam_schema.slot_id = Slot.find(exam_schema[:slot_id]).id
      @exam_schema.classroom = @classroom
      @exam_schema.sub_subject = @classroom.main_subjects.find(exam_schema[:main_subject_id]).sub_subjects.find(exam_schema[:sub_subject_id])
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
    if @exam_schema.update(exam_schema_update_params)
      render json: {success:{success:"yes",type:"success",display:"yes",message:"ok"},data:{exam_schema:@exam_schema}}  
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
  def set_examination
    @examination = @school.examinations.find(params[:examination_id])
  end
  def set_classroom
    @classroom = @school.classrooms.find(params[:classroom_id])
  end
  
  def set_exam_schema
    @exam_schema = @examination.exam_schemas.find(params[:id])
  end
  
  def exam_schema_params
    @exam_schema_params = params[:data]
  end
  
  def exam_schema_update_params
    params.require(:data).permit(:exam_date,:duration,:slot_id)
  end
end
