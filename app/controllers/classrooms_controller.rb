class ClassroomsController < ApplicationController
  before_action :check_authentication
  before_action :set_school
  before_action :set_classroom, only: [:destroy,:show]
  
  def index
    @classrooms = @school.classrooms.order(classroom_number: :asc).all
    if @classrooms.length <= 0
      render json: {success:{success:"yes",type:"notice",display:"no"},data:{classrooms:@classrooms}}
    else
      render json: {success:{success:"yes",type:"notice",display:"no"},data:{classrooms:@classrooms}}
    end
  end
  
  def create
    classroom = DefaultClassroom.find(params[:default_classroom_id])
    #check if they fucked up
    if classroom != nil
      #they did'nt fucked check if classroom already exists
      if Classroom.where(classroom_number: classroom.classroom_name).first == nil
        @classroom = @school.classrooms.new(classroom_number: classroom.classroom_name)
        if @classroom.save
          create_initial_section
          render json: {success:{success:"yes",type:"success",display:"yes",message:"Classroom added"},data:{classroom:@classroom}}
        else
          render json: {success:{success:"no",display:"yes",type:"error",message:"Unable to create classroom"},data:{}}
        end
        #this means classroom already exists
       else
        render json: {success:{success:"no",display:"yes",type:"error",message:"Classroom already exists"},data:{}}   
      end
      #this means they fucked up
    else
      render json: {success:{success:"no",diplay:"yes",type:"error",message:"Unable to process your request./nTry Again"},data:{}}
    end
   end
  
  def destroy
   @classroom.destroy
   render json: {success:{success:"yes",type:"success",display:"yes",message:"Classroom destroyed"},data:{}}
  end
  
  private
  #def set_school
  #  @school = School.find(session[:school_id])
  #end
  
  #def classroom_params
  #  params.require(:classroom).permit(:classroom_number)
  #end
  
  def set_classroom
    @classroom = @school.classrooms.find(params[:id])
  end
  
  def create_initial_section
    @section = @classroom.sections.new(section: "A")
    @section.save
  end
end
