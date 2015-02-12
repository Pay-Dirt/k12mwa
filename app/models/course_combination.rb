class CourseCombination < ActiveRecord::Base
  belongs_to :course
  belongs_to :main_subject
end
