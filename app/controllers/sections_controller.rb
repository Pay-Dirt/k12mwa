#created by Akash
class SectionsController < ApplicationController
  before_action :check_authentication
  before_action :set_school
  before_action :set_classroom, only: [:create,:destroy,:show]
  
  def index
    if params[:classroom_id]
      @sections = @school.classrooms.find(params[:classroom_id]).sections.order(section: :asc).all
      render json: {success:{success:"yes",type:"success",display:"no",message:"Classroom loaded"},data:{sections:@sections}}
    else
      @sections = Section.order(section: :asc).all
      render json: {success:{success:"yes",type:"success",display:"no",message:"Classroom loaded"},data:{sections:@sections}}
    end
  end
 
  #this will add a new section to the classroom upon which it is called
  def create
    last_section = last_section_find.section
    if last_section[0].ord <= 75
      new_section = (last_section[0].ord + 1).chr
      @section = @classroom.sections.new(section: new_section)
      if @section.save
        render json: {success:{success:"yes",type:"success",display:"no",message:"Section created"},data:{section:@section}}
      else
        render json: {success:{success:"no",type:"error",display:"yes",message:"Unable to create section"},data:{section:@section}}
      end
    else
        render json: {success:{success:"no",type:"success",display:"yes",message:"Can only create upto 10 sections"},data:{section:@section}}      
    end
    
  end
  
  #this will remove the last section added in the particular classroom
  def destroy
    last_section = last_section_find
    if last_section.section[0].ord > 65
      if last_section.destroy
        render json: {success:{success:"yes",type:"success",display:"yes",message:"Section successfully deleted"},data:{section:last_section}}
      else
        render json: {success:{success:"no",type:"error",display:"no",message:"Unable to delete section"},data:{section:last_section}}
      end
     else
      render json: {success:{success:"no",type:"warning",display:"yes",message:"Can't delete.\nLast section"},data:{section:last_section}}   
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
