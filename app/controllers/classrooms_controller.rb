class ClassroomsController < ApplicationController
  before_action :set_school
  def index
    @classrooms = @school.classrooms.all
    if @classrooms.length <= 0
      render json: '{"classrooms":"none"}'
    else
      render json: @classrooms
    end
  end
  
  private
  def set_school
    @school = School.find(params[:school_id])
  end
end
