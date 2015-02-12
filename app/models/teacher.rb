class Teacher < ActiveRecord::Base
  #for mapping to section from teacher side
  has_one :section
  has_many :lectures
end
