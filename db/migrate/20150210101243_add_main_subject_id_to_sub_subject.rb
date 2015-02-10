class AddMainSubjectIdToSubSubject < ActiveRecord::Migration
  def change
    add_reference :sub_subjects, :main_subject, index: true
    add_foreign_key :sub_subjects, :main_subjects
  end
end
