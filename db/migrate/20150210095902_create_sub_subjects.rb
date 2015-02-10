class CreateSubSubjects < ActiveRecord::Migration
  def change
    create_table :sub_subjects do |t|
      t.string :name
      t.integer :max_marks

      t.timestamps null: false
    end
  end
end
