class CreateClassrooms < ActiveRecord::Migration
  def change
    create_table :classrooms do |t|
      t.integer :classroom_number
      t.references :school, index: true

      t.timestamps null: false
    end
    add_foreign_key :classrooms, :schools
  end
end
