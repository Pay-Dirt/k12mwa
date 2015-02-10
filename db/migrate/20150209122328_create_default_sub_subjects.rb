class CreateDefaultSubSubjects < ActiveRecord::Migration
  def change
    create_table :default_sub_subjects do |t|
      t.string :name
      t.integer :max_marks
      t.references :default_main_subject, index: true

      t.timestamps null: false
    end
    add_foreign_key :default_sub_subjects, :default_main_subjects
  end
end
