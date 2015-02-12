class CreateCourseCombinations < ActiveRecord::Migration
  def change
    create_table :course_combinations do |t|
      t.references :course, index: true
      t.references :main_subject, index: true

      t.timestamps null: false
    end
    add_foreign_key :course_combinations, :courses
    add_foreign_key :course_combinations, :main_subjects
  end
end
