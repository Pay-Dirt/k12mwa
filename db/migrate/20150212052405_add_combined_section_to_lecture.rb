class AddCombinedSectionToLecture < ActiveRecord::Migration
  def change
    add_column :lectures, :combined_section, :boolean
  end
end
