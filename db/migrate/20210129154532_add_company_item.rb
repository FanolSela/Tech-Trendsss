class AddCompanyItem < ActiveRecord::Migration[6.1]
  def change
    add_reference :items, :company, foreign_key: true
  end
end
