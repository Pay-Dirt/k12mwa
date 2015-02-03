class CreateSchools < ActiveRecord::Migration
  def change
    create_table :schools do |t|
      t.string :name
      t.string :username
      t.string :city
      t.string :locality

      t.timestamps null: false
    end
  end
end
