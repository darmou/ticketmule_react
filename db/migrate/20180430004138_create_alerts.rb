class CreateAlerts < ActiveRecord::Migration[5.2]
  def change
    create_table :alerts do |t|
      t.references :user, null: false
      t.references :ticket, null: false
      t.timestamps
    end

    add_index :alerts, [:ticket_id, :user_id], unique: true
  end
end
