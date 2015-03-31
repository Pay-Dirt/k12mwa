class DefaultMainSubject < ActiveRecord::Base
  has_many :default_sub_subjects
  attr_accessor :sub_subjects
  
end
