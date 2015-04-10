class CreateCoursesSections < ActiveRecord::Migration
  def change
    create_table :courses_sections do |t|
      t.references :course, index: true
      t.references :section, index: true

      t.timestamps null: false
    end
    add_foreign_key :courses_sections, :courses
    add_foreign_key :courses_sections, :sections
  end
end
