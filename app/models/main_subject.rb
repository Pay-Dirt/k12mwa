class MainSubject < ActiveRecord::Base
  belongs_to :school
  belongs_to :classroom
  has_many :sub_subjects, dependent: :destroy
  #this will map the main subject to course via course_combinatios
  has_many :course_combinations, dependent: :destroy
  has_many :courses, through: :course_combinations
  has_many :exam_schemas
  #adding sub_subjects to model
  attr_accessor :sub_subjects_detail
end
