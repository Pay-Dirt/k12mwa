class CreateAccounts < ActiveRecord::Migration
  def change
    create_table :accounts do |t|
      t.references :user, index: true
      t.string :account_type

      t.timestamps null: false
    end
    add_foreign_key :accounts, :users
  end
end
