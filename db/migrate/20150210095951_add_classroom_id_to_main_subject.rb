class AddClassroomIdToMainSubject < ActiveRecord::Migration
  def change
    add_reference :main_subjects, :classroom, index: true
    add_foreign_key :main_subjects, :classrooms
  end
end
