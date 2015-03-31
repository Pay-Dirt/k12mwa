class CreateExamSchemas < ActiveRecord::Migration
  def change
    create_table :exam_schemas do |t|
      t.references :main_subject, index: true
      t.references :examination, index: true
      t.datetime :exam_date
      t.integer :duration

      t.timestamps null: false
    end
    add_foreign_key :exam_schemas, :main_subjects_id
    add_foreign_key :exam_schemas, :examinations_id
  end
end
