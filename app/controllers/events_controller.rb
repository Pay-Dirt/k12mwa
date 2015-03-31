class EventsController < ApplicationController
    before_action :check_authentication
    before_action :set_school
    before_action :set_event, only: [:destroy,:update,:show]
  
  def index
    @holiday=@school.events.all
      render json: {success:{success:"yes",type:"success",display:"no"},data:{holiday:@holiday}}
  end
  
  def create
    @holiday=@school.events.new(event_params)
    if @holiday.save
      render json: {success:{success:"yes",type:"success",display:"yes"},data:{holiday:@holiday}}
     else
       render json: {} 
    end
  end
    
  def destroy
      if @holiday.destroy
        render json: {success:{success:"yes",type:"success",display:"yes"},data:{}}
      else
        render json:{}  
      end
  end


private

def event_params
  params.require(:events).permit(:event_date,:details,:context)
end

def set_event
  @holiday = @school.events.find(params[:id])
end
end
