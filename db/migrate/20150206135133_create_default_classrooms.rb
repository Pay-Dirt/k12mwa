class CreateDefaultClassrooms < ActiveRecord::Migration
  def change
    create_table :default_classrooms do |t|
      t.string :classroom_name

      t.timestamps null: false
    end
  end
end
