class AddIsPracticalToDefaultSubSubjects < ActiveRecord::Migration
  def change
    add_column :default_sub_subjects, :is_practical, :boolean
  end
end
