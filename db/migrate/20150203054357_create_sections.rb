class CreateSections < ActiveRecord::Migration
  def change
    create_table :sections do |t|
      t.string :section
      t.references :classroom, index: true

      t.timestamps null: false
    end
    add_foreign_key :sections, :classrooms
  end
end
