class CreateComments < ActiveRecord::Migration[5.2]
  def change
    create_table :comments do |t|
      t.text :comment, null: false
      t.references :ticket, null: false
      t.references :user, null: false

      t.timestamps
    end

    #execute "alter table comments add constraint fk_ticket foreign key (ticket_id) references tickets(id)"
  end
end
