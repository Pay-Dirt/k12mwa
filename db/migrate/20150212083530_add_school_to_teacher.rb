class AddSchoolToTeacher < ActiveRecord::Migration
  def change
    add_reference :teachers, :school, index: true
    add_foreign_key :teachers, :schools
  end
end
