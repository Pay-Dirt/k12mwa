class MainSubject < ActiveRecord::Base
  belongs_to :school
  belongs_to :classroom
  has_many :sub_subjects
end
