class CreateAttendances < ActiveRecord::Migration
  def change
    create_table :attendances do |t|
      t.references :student, index: true
      t.references :school, index: true
      t.references :section, index: true
      t.date :date
      t.boolean :attendance

      t.timestamps null: false
    end
    add_foreign_key :attendances, :students
    add_foreign_key :attendances, :schools
    add_foreign_key :attendances, :sections
  end
end
