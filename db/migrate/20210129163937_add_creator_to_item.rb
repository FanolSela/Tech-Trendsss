class AddCreatorToItem < ActiveRecord::Migration[6.1]
  def change
    add_reference :items, :creator, references: :users, index: true
    add_foreign_key :items, :users, column: :creator_id  
  end
end
