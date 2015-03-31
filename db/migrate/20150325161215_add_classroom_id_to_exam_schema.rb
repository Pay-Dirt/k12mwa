class AddClassroomIdToExamSchema < ActiveRecord::Migration
  def change
    add_reference :exam_schemas, :classroom, index: true
    add_foreign_key :exam_schemas, :classrooms
  end
end
