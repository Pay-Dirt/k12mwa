class MainSubjectsController < ApplicationController
  before_action :check_authentication
  before_action :set_school
  before_action :set_classroom
  
  def index
    @main_subjects = @classroom.main_subjects
    @main_subjects.each do |main_subject|
      if params[:practical] == "true"
        sub_subject = main_subject.sub_subjects.where(is_practical:true)
      else
        sub_subject = main_subject.sub_subjects      
      end
      main_subject.sub_subjects_detail = sub_subject
    end
    render json: {success:{success:"yes",type:"success",display:"no"},data:{main_subjects:@main_subjects.as_json(:methods => :sub_subjects_detail)}}
  end
  

  #this will create main_subject as well as sub_subject but if in between any sub_subject fails to
  #save the transaction will rollback
  #if the subject has no sub subjects it will become itself
  def create
    @main_subjects = @classroom.main_subjects.new(main_subject_params)
    if @main_subjects.save
      @sub_subjects = sub_subject_params
      
      length = @sub_subjects.length
      count_sub_subjects = 0
      @sub_subjects.each do |sub_subject|
        puts sub_subject
        if sub_subject[:is_practical] == false
          count_sub_subjects += 1
        end
        @sub_subject = @main_subjects.sub_subjects.new(name: sub_subject[:name],max_marks: sub_subject[:max_marks],is_practical: sub_subject[:is_practical])
        if @sub_subject.save
          length -= length
        end
      end
      if count_sub_subjects == 0
        length += 1
        sub_subject = @main_subjects
        @sub_subject = @main_subjects.sub_subjects.new(name: sub_subject[:name],max_marks: sub_subject[:max_marks],is_practical: false)
        if @sub_subject.save
          length -= 1
        end
      end
      if length == 0
        render json: {success:{success:"yes",display:"yes",type:"success",message:"Subject successfully added"},data:{main_subjects:@main_subjects}}
      else
        @main_subjects.destroy
        render json: {success:{success:"no",display:"yes",type:"error",message:"failed"},data:{main_subjects:@main_subjects}}
      end

    else
      render json: {success:{success:"no",display:"yes",type:"error",message:"failed"},data:{main_subjects:@main_subjects}}
    end
  end
  

  def destroy
    if @classroom.main_subjects.find(params[:id]).destroy
      render json: {success:{success:"yes",display:"yes",type:"success",message:"Subject removed"},data:{}}
    else
      render json: {success:{success:"no",display:"yes",type:"error",message:"Failed to remove subject"},data:{}}
    end
  end
  
  private
  
  def set_classroom
    @classroom = @school.classrooms.find(params[:classroom_id])
  end
  
  def main_subject_params
    params.require(:main_subject).permit(:name,:max_marks,:is_graded)
  end
  
  def sub_subject_params
    if params[:sub_subjects] == nil
      params.permit(:sub_subjects)
    else
      params.require(:sub_subjects)
    end
  end
  
end
