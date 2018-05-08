class CreatePriorities < ActiveRecord::Migration[5.2]
  def change
    create_table :priorities do |t|
      t.string :name, null: false
      t.datetime :disabled_at
    end
  end
end
