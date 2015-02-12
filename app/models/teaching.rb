class Teaching < ActiveRecord::Base
  belongs_to :lecture
  belongs_to :section
end
