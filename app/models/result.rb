class Result < ActiveRecord::Base
  belongs_to :exam_schema
  belongs_to :student
end
