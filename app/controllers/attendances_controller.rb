class AttendancesController < ApplicationController
  before_action :check_authentication
  before_action :set_school
  before_action :set_student, only: [:create,:destroy]
  def index
    if params[:attendanceOf]
      if params[:attendanceOf] == "month"
        month = params[:month]
        if params[:student_id]
          @attendances = Student.find(params[:student_id]).attendances.where("date like ? ",month + "-%")
        else
          @attendances = Section.find(params[:section_id]).attendances.where("date like ?",month+"-%")
       end
       render json: {success:{success:"yes",type:"success",display:"no"},data:{attendances:@attendances}}
      elsif params[:attendanceOf] == "day"
        date = params[:date]
        if(params[:student_id])
        @attendances = Student.find(params[:student_id]).attendances.where("date=?",date)
        else
          @attendances = Section.find(params[:section_id]).attendances.where("date=?",date)
        end
        render json: {success:{success:"yes",type:"success",display:"no"},data:{attendances:@attendances}}
      end
    elsif params[:section_id]
      @attendance = @school.classrooms.find(params[:classroom_id]).sections.find(params[:section_id]).attendances
      render json: {success:{success:"yes",display:"no",type:"success"},data:{attendance:@attendance}}
    elsif params[:student_id]
      @attendance = @school.students.find(params[:student_id]).attendances
      render json: {success:{success:"yes",display:"yes",type:"success"},data:{attendance:@attendance}}
    else
      render json: {}
    end
      
  end
  
  def create
    @attendance = @student.attendances.new(attendance_params)
    @attendance.school = @school
    @attendance.section = @school.classrooms.find(params[:classroom_id]).sections.find(params[:section_id])
    if @attendance.save
      render json: {success:{success:"yes",display:"no",type:"success"},data:{attendance:@attendance}}
    else
      render json: {success:{success:"no",display:"no",type:"error"},data:{attendance:@attendance}}
    end
  end
  
  def update
   @attendance = @school.attendances.find(params[:id])
   if @attendance.update(attendance_update_params)
      render json: {success:{success:"yes",display:"yes",type:"success",message:"Attendance Successfully updated"},data:{attendance:@attendance}}
    else
      render json: {success:{success:"no",display:"no",type:"error"},data:{attendance:@attendance}}
   end    
  end
  
  private
  def set_student
    @student = @school.classrooms.find(params[:classroom_id]).sections.find(params[:section_id]).students.find(params[:student_id])
  end
  
  def attendance_params
    params.permit(:student_id,:attendance,:date)
  end
  def attendance_update_params
        params.permit(:attendance)
  end
  
end


