class CreateExaminationResults < ActiveRecord::Migration
  def change
    create_table :examination_results do |t|
      t.references :student, index: true
      t.references :examination, index: true
      t.references :sub_subject, index: true
      t.integer :marks

      t.timestamps null: false
    end
    add_foreign_key :examination_results, :students
    add_foreign_key :examination_results, :examinations
    add_foreign_key :examination_results, :sub_subjects
  end
end
