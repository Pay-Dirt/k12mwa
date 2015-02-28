class CreateStudents < ActiveRecord::Migration
  def change
    create_table :students do |t|
      t.integer :roll_number
      t.string :name
      t.references :course, index: true
      t.references :section, index: true

      t.timestamps null: false
    end
    add_foreign_key :students, :courses
    add_foreign_key :students, :sections
  end
end
