class AddUncofirmedEmailToMember < ActiveRecord::Migration
  def up
    add_column :members, :unconfirmed_email, :string, after: :confirmation_sent_at
  end

  def down
    remove_column :members, :unconfirmed_email, :string
  end
end
