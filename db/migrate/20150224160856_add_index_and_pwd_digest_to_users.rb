class AddIndexAndPwdDigestToUsers < ActiveRecord::Migration
  def change
    add_index :users, :username, unique: true
    add_index :users, :mobile
    add_column :users, :password_digest, :string
  end
end
