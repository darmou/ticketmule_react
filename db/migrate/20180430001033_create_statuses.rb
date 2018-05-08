class CreateStatuses < ActiveRecord::Migration[5.2]
  def change
    create_table :statuses do |t|
      t.string :name, null: false
      t.datetime :disabled_at

    end
  end
end
