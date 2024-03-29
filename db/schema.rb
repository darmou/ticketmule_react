# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_02_21_073407) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "action_mailbox_inbound_emails", force: :cascade do |t|
    t.integer "status", default: 0, null: false
    t.string "message_id", null: false
    t.string "message_checksum", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["message_id", "message_checksum"], name: "index_action_mailbox_inbound_emails_uniqueness", unique: true
  end

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", precision: nil, null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", precision: nil, null: false
    t.string "service_name", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "alerts", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "ticket_id", null: false
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.index ["ticket_id", "user_id"], name: "index_alerts_on_ticket_id_and_user_id", unique: true
    t.index ["ticket_id"], name: "index_alerts_on_ticket_id"
    t.index ["user_id"], name: "index_alerts_on_user_id"
  end

  create_table "attachments", force: :cascade do |t|
    t.string "data_file_name", null: false
    t.string "data_content_type", null: false
    t.integer "data_file_size", null: false
    t.integer "download_count", default: 0
    t.bigint "ticket_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.index ["ticket_id"], name: "index_attachments_on_ticket_id"
    t.index ["user_id"], name: "index_attachments_on_user_id"
  end

  create_table "comments", force: :cascade do |t|
    t.text "comment", null: false
    t.bigint "ticket_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.index ["ticket_id"], name: "index_comments_on_ticket_id"
    t.index ["user_id"], name: "index_comments_on_user_id"
  end

  create_table "contacts", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name", null: false
    t.string "email", null: false
    t.string "mobile_phone"
    t.string "office_phone"
    t.string "affiliation"
    t.text "notes"
    t.datetime "disabled_at", precision: nil
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
  end

  create_table "groups", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "disabled_at", precision: nil
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
  end

  create_table "priorities", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "disabled_at", precision: nil
  end

  create_table "sessions", force: :cascade do |t|
    t.string "session_id", null: false
    t.text "data"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["session_id"], name: "index_sessions_on_session_id", unique: true
    t.index ["updated_at"], name: "index_sessions_on_updated_at"
  end

  create_table "statuses", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "disabled_at", precision: nil
  end

  create_table "tickets", force: :cascade do |t|
    t.string "title", null: false
    t.text "details"
    t.bigint "group_id", null: false
    t.bigint "status_id", null: false
    t.bigint "priority_id", null: false
    t.bigint "time_type_id", null: false
    t.bigint "contact_id", null: false
    t.integer "created_by", null: false
    t.integer "owned_by"
    t.datetime "closed_at", precision: nil
    t.integer "comments_count", default: 0
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.index ["contact_id"], name: "index_tickets_on_contact_id"
    t.index ["created_by"], name: "index_tickets_on_created_by"
    t.index ["group_id"], name: "index_tickets_on_group_id"
    t.index ["owned_by"], name: "index_tickets_on_owned_by"
    t.index ["priority_id"], name: "index_tickets_on_priority_id"
    t.index ["status_id"], name: "index_tickets_on_status_id"
    t.index ["time_type_id"], name: "index_tickets_on_time_type_id"
  end

  create_table "time_types", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "disabled_at", precision: nil
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "authentication_token", limit: 30
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at", precision: nil
    t.datetime "remember_created_at", precision: nil
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at", precision: nil
    t.datetime "last_sign_in_at", precision: nil
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.string "username", null: false
    t.integer "failed_sign_in_count"
    t.string "last_login_ip"
    t.string "email_confirmation"
    t.string "current_login_ip"
    t.string "time_zone"
    t.string "first_name"
    t.string "last_name"
    t.boolean "admin", default: false, null: false
    t.datetime "disabled_at", precision: nil
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
end
