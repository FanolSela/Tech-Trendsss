class User < ApplicationRecord
  has_and_belongs_to_many :items, :join_table => :users_items
  has_secure_password 
end
