class User < ActiveRecord::Base
  before_save {self.username = username.downcase}
  validates :username, presence: true, uniqueness: {case_sensitive: false}, length: {maximum: 50}
  has_secure_password
  validates :password, length: {minimum: 6}
  belongs_to :school
  has_many :accounts
end
