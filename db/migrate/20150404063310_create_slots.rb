class CreateSlots < ActiveRecord::Migration
  def change
    create_table :slots do |t|
      t.references :examination, index: true
      t.time :start_time

      t.timestamps null: false
    end
    add_foreign_key :slots, :examinations
  end
end
