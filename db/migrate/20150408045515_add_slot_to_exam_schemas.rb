class AddSlotToExamSchemas < ActiveRecord::Migration
  def change
    add_reference :exam_schemas, :slot, index: true
    add_foreign_key :exam_schemas, :slots
  end
end
