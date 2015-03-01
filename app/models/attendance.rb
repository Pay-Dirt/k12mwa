class Attendance < ActiveRecord::Base
  belongs_to :student
  belongs_to :school
  belongs_to :section
end
