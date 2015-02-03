class Section < ActiveRecord::Base
  belongs_to :classroom
  
  validates :section, presence: true
end
