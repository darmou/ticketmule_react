# Be sure to restart your server when you modify this file.

#Rails.application.config.session_store :disabled
#
#Rails.application.config.session_store :my_custom_store
Rails.application.config.session_store :active_record_store, :key => '_my_app_session'