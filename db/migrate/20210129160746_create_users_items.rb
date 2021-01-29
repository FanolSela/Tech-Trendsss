class CreateUsersItems < ActiveRecord::Migration[6.1]
  def change
    create_table :users_items do |t|
      t.references :user, foreign_key: true
      t.references :item, foreign_key: true
      
      t.timestamps
    end
  end
end
