class CreateMainSubjects < ActiveRecord::Migration
  def change
    create_table :main_subjects do |t|
      t.string :name
      t.integer :max_marks
      t.boolean :is_graded
      t.references :school, index: true

      t.timestamps null: false
    end
    add_foreign_key :main_subjects, :schools
  end
end
