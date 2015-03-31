class AddSchoolIdToEvents < ActiveRecord::Migration
  def change
    add_reference :events, :school, index: true
    add_foreign_key :events, :schools
  end
end
