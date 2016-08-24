class AddNameToMembers < ActiveRecord::Migration
  def up
    add_column :members, :name, :string
  end

  def down
    remove_column :members, :name, :string
  end
end
