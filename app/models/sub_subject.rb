class SubSubject < ActiveRecord::Base
  belongs_to :main_subject
  has_many :lectures
  has_one :exam_schema
end
