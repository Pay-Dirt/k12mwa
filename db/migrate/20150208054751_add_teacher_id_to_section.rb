class AddTeacherIdToSection < ActiveRecord::Migration
  def change
    add_column :sections, :teacher_id, :integer
  end
end
