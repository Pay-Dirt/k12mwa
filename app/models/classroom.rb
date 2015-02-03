class Classroom < ActiveRecord::Base
  belongs_to :school
  has_many :sections
  
  validates :classroom_number, presence: true, uniqueness: true
end
