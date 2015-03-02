class AddClassroomNumberDefaultToMainSubjects < ActiveRecord::Migration
  def change
    add_column :default_main_subjects, :classroom_number, :integer
  end
end
