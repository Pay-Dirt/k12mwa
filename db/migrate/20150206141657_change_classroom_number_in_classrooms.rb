class ChangeClassroomNumberInClassrooms < ActiveRecord::Migration
  def change
    change_column :classrooms, :classroom_number, :string
  end
end
