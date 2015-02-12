class Lecture < ActiveRecord::Base
  belongs_to :teacher
  belongs_to :sub_subject
  has_many :teachings
  has_many :sections, through: :teachings
end
