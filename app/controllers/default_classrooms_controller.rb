class DefaultClassroomsController < ApplicationController
  #this contains the default list of classrooms available
  #i.e. users can only use these names for their classroom
  #this might bring uniformity throughout
  
  def index
    #create a method to check if no default classrooms are present the create
    @default_classrooms = DefaultClassroom.order(id: :asc).all
    render json: {success:{success:"yes",display:"no",type:"success",message:"Default Classrooms loaded!"},data:{default_classrooms:@default_classrooms}}  
  end
end
