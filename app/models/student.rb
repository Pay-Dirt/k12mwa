class Student < ActiveRecord::Base

  belongs_to :school
  belongs_to :course
  belongs_to :section
  has_many :attendances

end
