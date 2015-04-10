class Examination < ActiveRecord::Base
  validates :name, uniqueness: {case_sensitive: true}
  has_many :exam_schemas, dependent: :destroy
  belongs_to :school
  has_many :slots
end
