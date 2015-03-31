class School < ActiveRecord::Base
  has_many :classrooms
  has_many :teachers
  has_many :students
  has_many :attendances
  has_many :users
  has_many :examinations
  has_many :events
end
