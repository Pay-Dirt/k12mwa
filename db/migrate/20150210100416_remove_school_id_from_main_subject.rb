class RemoveSchoolIdFromMainSubject < ActiveRecord::Migration
  def change
    remove_column :main_subjects, :school_id
  end
end
