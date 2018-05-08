class CreateAttachments < ActiveRecord::Migration[5.2]
  def change
    create_table :attachments do |t|
      t.string :data_file_name, null: false
      t.string :data_content_type, null: false
      t.integer :data_file_size, null: false
      t.integer :download_count, default: 0
      t.references :ticket, null:  false
      t.references :user, null: false
      t.timestamps
    end

  end
end
