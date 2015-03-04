class Section < ActiveRecord::Base
  belongs_to :classroom
  belongs_to :teacher
  has_many :teachings
  has_many :lectures, through: :teachings
  has_many :students
  has_many :attendances
  validates :section, presence: true
end
