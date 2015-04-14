class CreateResults < ActiveRecord::Migration
  def change
    create_table :results do |t|
      t.references :exam_schema, index: true
      t.references :student, index: true
      t.integer :obtained_marks

      t.timestamps null: false
    end
    add_foreign_key :results, :exam_schemas
    add_foreign_key :results, :students
  end
end
