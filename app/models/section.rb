class Section < ActiveRecord::Base
  belongs_to :classroom
  belongs_to :teacher
  validates :section, presence: true
end
