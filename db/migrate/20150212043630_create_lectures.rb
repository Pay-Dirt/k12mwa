class CreateLectures < ActiveRecord::Migration
  def change
    create_table :lectures do |t|
      t.references :teacher, index: true
      t.references :sub_subject, index: true

      t.timestamps null: false
    end
    add_foreign_key :lectures, :teachers
    add_foreign_key :lectures, :sub_subjects
  end
end
