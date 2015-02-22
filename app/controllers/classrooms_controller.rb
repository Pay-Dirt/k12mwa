class ClassroomsController < ApplicationController
  before_action :set_school
  before_action :set_classroom, only: [:destroy,:show]
  
  def index
    @classrooms = @school.classrooms.order(classroom_number: :asc).all
    if @classrooms.length <= 0
      render json: '{"classrooms":"none"}'
    else
      render json: @classrooms.push({success:"yes",type:"notice",display:"no"}).reverse
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
          render json: @classroom
        else
          render json: '{"success":"no"}'
        end
        #this means classroom already exists
       else
        render json: '{"success":"no"}'   
      end
      #this means they fucked up
    else
      render json: '{"success":"no"}'
    end
   end
  
  def destroy
   @classroom.destroy
   render json: "{}"
  end
  
  private
  def set_school
    @school = School.find(params[:school_id])
  end
  
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
