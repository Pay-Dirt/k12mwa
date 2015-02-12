class CreateTeachings < ActiveRecord::Migration
  def change
    create_table :teachings do |t|
      t.references :lecture, index: true
      t.references :section, index: true

      t.timestamps null: false
    end
    add_foreign_key :teachings, :lectures
    add_foreign_key :teachings, :sections
  end
end
