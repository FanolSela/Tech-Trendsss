class CreateNames < ActiveRecord::Migration[6.1]
  def change
    create_table :names do |t|
      t.text :description
      t.decimal :price

      t.timestamps
    end
  end
end
