# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_09_06_224729) do

  create_table "alerts", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "ticket_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["ticket_id", "user_id"], name: "index_alerts_on_ticket_id_and_user_id", unique: true
    t.index ["ticket_id"], name: "index_alerts_on_ticket_id"
    t.index ["user_id"], name: "index_alerts_on_user_id"
  end

  create_table "attachments", force: :cascade do |t|
    t.string "data_file_name", null: false
    t.string "data_content_type", null: false
    t.integer "data_file_size", null: false
    t.integer "download_count", default: 0
    t.integer "ticket_id", null: false
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["ticket_id"], name: "index_attachments_on_ticket_id"
    t.index ["user_id"], name: "index_attachments_on_user_id"
  end

  create_table "comments", force: :cascade do |t|
    t.text "comment", null: false
    t.integer "ticket_id", null: false
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
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
    t.datetime "disabled_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "groups", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "disabled_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "priorities", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "disabled_at"
  end

  create_table "statuses", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "disabled_at"
  end

  create_table "tickets", force: :cascade do |t|
    t.string "title", null: false
    t.text "details"
    t.integer "group_id", null: false
    t.integer "status_id", null: false
    t.integer "priority_id", null: false
    t.integer "time_type_id", null: false
    t.integer "contact_id", null: false
    t.integer "created_by", null: false
    t.integer "owned_by"
    t.datetime "closed_at"
    t.integer "comments_count", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
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
    t.datetime "disabled_at"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "authentication_token", limit: 30
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
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
    t.datetime "disabled_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

end
