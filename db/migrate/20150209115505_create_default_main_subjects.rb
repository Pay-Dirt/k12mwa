class CreateDefaultMainSubjects < ActiveRecord::Migration
  def change
    create_table :default_main_subjects do |t|
      t.string :name
      t.integer :max_marks
      t.boolean :is_graded

      t.timestamps null: false
    end
  end
end
