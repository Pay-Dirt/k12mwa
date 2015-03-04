class ChangeAttendanceFromAttendance < ActiveRecord::Migration
  def up
    change_column :attendances,:attendance,:string
  end
  
  def down
    change_column :attendances, :attendance, :boolean
  end
end
