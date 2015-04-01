class ExaminationResultsController < ApplicationController
  before_action :check_authentication
  before_action :set_school
  before_action :set_classroom_section
  def index
    
  end
  
  private
  def set_classroom_section
    @section = @school.classrooms.find(params[:classroom_id]).section.find(params[:section_id])
  end
end
