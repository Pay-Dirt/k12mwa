class CreateTeachers < ActiveRecord::Migration
  def change
    create_table :teachers do |t|
      t.string :name
      t.string :fathers_name
      t.string :contact

      t.timestamps null: false
    end
  end
end
