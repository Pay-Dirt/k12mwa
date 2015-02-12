class SectionSerializer < ActiveModel::Serializer
  #id ,section,classroom_id(belongs_to),teacher_id(belongs_to)
  attributes :id, :section, :classroom_id
end
