class ExamSchema < ActiveRecord::Base
  belongs_to :main_subject
  belongs_to :examination
  belongs_to :classroom
  belongs_to :sub_subject
  
  attr_accessor :sub_subject_name
end
