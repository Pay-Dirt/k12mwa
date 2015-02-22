class Student < ActiveRecord::Base
  belongs_to :course
  belongs_to :section
  belongs_to :school
end
