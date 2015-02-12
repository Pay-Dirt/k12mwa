class Course < ActiveRecord::Base
  belongs_to :classroom
  has_many :course_combinations
  has_many :main_subjects, through: :course_combinations
end
