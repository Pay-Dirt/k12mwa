class MainSubject < ActiveRecord::Base
  belongs_to :school
  belongs_to :classroom
  has_many :sub_subjects
  #this will map the main subject to course via course_combinatios
  has_many :course_combinations
  has_many :courses, through: :course_combinations
end
