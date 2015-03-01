#created by Akash
class SectionsController < ApplicationController
  protect_from_forgery :except => :all 
  before_action :set_school
  before_action :set_classroom, only: [:create,:destroy,:show]
  
  def index
    if params[:classroom_id]
      @sections = School.find(params[:school_id]).classrooms.find(params[:classroom_id]).sections.order(section: :asc).all
      render json: @sections
    else
      @sections = Section.order(section: :asc).all
      render json: @sections
    end
  end
 
  #this will add a new section to the classroom upon which it is called
  def create
    last_section = last_section_find.section
    if last_section[0].ord <= 75
      new_section = (last_section[0].ord + 1).chr
      @section = @classroom.sections.new(section: new_section)
      if @section.save
        render json: @section
      else
        render json: '{"error":"unable to create section"}'
      end
    else
        render json: '{"success":"no","display":"yes","error":"Can only create upto 10 sections"}'      
    end
    
  end
  
  #this will remove the last section added in the particular classroom
  def destroy
    last_section = last_section_find
    if last_section.section[0].ord > 65
      if last_section.destroy
        render json: last_section
      else
        render json: '{"success":"no"}'
      end
     else
      render json: '{"success":"no","why":"can\' delete last section"}'   
    end
  end
  
  
  private
  def set_classroom
    @classroom = @school.classrooms.find(params[:classroom_id])
  end
  
  #this function returns the hash of the last section added
  def last_section_find
    var_last_section = @classroom.sections.order(section: :desc).first
  end
    
end
