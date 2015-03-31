class CoursesController < ApplicationController
  before_action :check_authentication
  before_action :set_school
  before_action :set_classroom
  before_action :set_course, only: [:update,:edit,:destroy,:show]
  def index
    @courses = @classroom.courses.all
    render json: {success:{success:"yes",type:"success",display:"no"},data:{courses:@courses}}  
  end
  
  def create
    @course = @classroom.courses.new(create_course_params)
    course_subjects = params[:course_subjects]
    length = course_subjects.length
    if @course.save
      course_subjects.each do |main_subject_id|
        main_subject = @classroom.main_subjects.find(main_subject_id)
        course_combination = @course.course_combinations.new(main_subject: main_subject)
        if course_combination.save
          length = length - 1
        end
      end
      if length == 0
        render json: {success:{success:"yes",type:"success",display:"yes",message:"Course created"},data:{course:@course}}
      else
        @course.destroy
        render json: {success:{success:"no",type:"error",display:"yes",message:"Unable to create course"},data:{course:@course}}
      end
    else
      render json: {success:{success:"no",type:"error",display:"yes",message:"Unable to create course"},data:{course:@course}}
    end
  end
  
  def show
    course_subjects = @course.main_subjects
    @course.subjects = course_subjects
    render json: {success:{success:"yes",type:"success",display:"no"},data:{course:@course.as_json(methods: :subjects)}}
  end
  
  def destroy
    if @course.destroy
      render json: {success:{success:"yes",type:"success",display:"yes",message:"Deleted"},data:{}}
    else
      render json: {success:{success:"no",type:"error",display:"yes",message:"Failed to delete"},data:{course:@course}}
    end
  end
  
  private
  def set_classroom
    @classroom = @school.classrooms.find(params[:classroom_id])
  end
  
  def create_course_params
    params.require(:course).permit(:name)
  end
  
  def set_course
    @course = @classroom.courses.find(params[:id])
  end
end
