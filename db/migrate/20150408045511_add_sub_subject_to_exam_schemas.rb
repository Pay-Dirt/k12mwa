class AddSubSubjectToExamSchemas < ActiveRecord::Migration
  def change
    add_reference :exam_schemas, :sub_subject, index: true
    add_foreign_key :exam_schemas, :sub_subjects
  end
end
