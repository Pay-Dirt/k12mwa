class SubSubject < ActiveRecord::Base
  belongs_to :main_subject
  has_many :lectures
end
