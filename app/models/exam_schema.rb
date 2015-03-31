class ExamSchema < ActiveRecord::Base
  belongs_to :main_subject
  belongs_to :examination
  belongs_to :classroom
end
