class School < ActiveRecord::Base
  has_many :classrooms
  has_many :teachers
  has_many :students
  has_many :users
end
