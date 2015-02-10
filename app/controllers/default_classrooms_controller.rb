class DefaultClassroomsController < ApplicationController
  #this contains the default list of classrooms available
  #i.e. users can only use these names for their classroom
  #this might bring uniformity throughout
  
  def index
    @default_classrooms = DefaultClassroom.order(id: :asc).all
    render json: @default_classrooms  
  end
end
