class Teacher < ActiveRecord::Base
  belongs_to :school
  #for mapping to section from teacher side
  has_one :section
  has_many :lectures
end
