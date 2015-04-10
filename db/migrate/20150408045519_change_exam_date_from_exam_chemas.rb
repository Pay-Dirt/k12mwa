class ChangeExamDateFromExamChemas < ActiveRecord::Migration
  def change
    change_column :exam_schemas,:exam_date,:date
  end
end
