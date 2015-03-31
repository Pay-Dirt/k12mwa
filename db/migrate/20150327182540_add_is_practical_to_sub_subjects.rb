class AddIsPracticalToSubSubjects < ActiveRecord::Migration
  def change
    add_column :sub_subjects, :is_practical, :boolean
  end
end
