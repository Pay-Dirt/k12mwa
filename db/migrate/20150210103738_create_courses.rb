class CreateCourses < ActiveRecord::Migration
  def change
    create_table :courses do |t|
      t.string :name
      t.references :classroom, index: true

      t.timestamps null: false
    end
    add_foreign_key :courses, :classrooms
  end
end
