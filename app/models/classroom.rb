class Classroom < ActiveRecord::Base
  
  #active record relations are declared here
  belongs_to :school
  has_many :sections, dependent: :destroy
  has_many :main_subjects
  
  #validations are declared here
  #classroom_number must be an integer check if exists in classrooms_controller.rb
  validates :classroom_number, presence: true
  
end
