class AddSchoolIdToExamination < ActiveRecord::Migration
  def change
    add_reference :examinations, :school, index: true
    add_foreign_key :examinations, :schools
  end
end
