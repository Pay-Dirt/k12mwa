class SlotsController < ApplicationController
  before_action :check_authentication
  before_action :set_school
  before_action :set_examination
  before_action :set_slot, only: [:destroy,:update]
  
  def index
    @slots = @examination.slots
    render json: {success:{success:"yes",type:"success",display:"no"},data:{slots:@slots}}
  end
  
  def create
    @slot = @examination.slots.new(slot_params)
    if @slot.save
      render json: {success:{success:"yes",type:"success",display:"no"},data:{slot:@slot}}
    else
      render json: {success:{success:"no",type:"error",display:"no"},data:{}}
    end
  end
  
  def show
    @slot = @examination.slots.find(params[:id])
    render json: {success:{success:"yes",type:"success",display:"no"},data:{slot:@slot}}
  end
  
  def update
    if @slot.update(slot_params)
      render json: {success:{success:"yes",type:"success",display:"no"},data:{slot:@slot}}
    else
      render json: {success:{success:"no",type:"error",display:"no"},data:{}}
    end
  end
  
  def destroy
    if @slot.destroy
      render json: {success:{success:"yes",type:"success",display:"no"},data:{}}
    else
      render json: {success:{success:"no",type:"error",display:"no"},data:{}}
    end
   
  end
  
  private
  def set_examination
    @examination = @school.examinations.find(params[:examination_id])
  end
  
  def slot_params
    params.require(:slot).permit(:name,:start_time)
  end
  
  def set_slot
    @slot = @examination.slots.find(params[:slot_id])
  end
  
  
  
end
