class ClassroomSerializer < ActiveModel::Serializer
  #id ,classroom_number, school_id(belongs_to)
  attributes :id, :classroom_number
  
end
