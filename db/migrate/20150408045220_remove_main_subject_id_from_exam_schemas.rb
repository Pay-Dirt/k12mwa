class RemoveMainSubjectIdFromExamSchemas < ActiveRecord::Migration
  def change
    remove_column :exam_schemas, :main_subject_id
  end
end
