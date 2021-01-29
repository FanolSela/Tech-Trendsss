class Item < ApplicationRecord
  belongs_to :company
  has_and_belongs_to_many :users, :join_table => :users_items
  belongs_to :creator, class_name: :User, foreign_key: :creator_id
end
