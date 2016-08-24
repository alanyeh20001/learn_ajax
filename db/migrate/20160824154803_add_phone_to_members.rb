class AddPhoneToMembers < ActiveRecord::Migration
  def up
    add_column :members, :phone, :string
  end

  def down
    remove_column :members, :phone, :string
  end
end
