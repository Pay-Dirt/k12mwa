class ExaminationResult < ActiveRecord::Base
  belongs_to :student
  belongs_to :examination
  belongs_to :sub_subject
end
