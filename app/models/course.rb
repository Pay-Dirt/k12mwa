class Course < ActiveRecord::Base
  attr_accessor :subjects
  belongs_to :classroom
  has_many :course_combinations, dependent: :destroy
  has_many :main_subjects, through: :course_combinations
end
