class Api::V1::UsersController < ApplicationController
  include Devise::Controllers::Helpers
  before_action :set_user, only: [:show, :update, :destroy]

  # GET /users
  def index
    if params[:letter]
      last_name = User.arel_table[:last_name]
      users = User.where(last_name.matches("#{params[:letter]}%"))
    else
      users = User.all
    end
    @pagy, @users = pagy(users)
    contact_records_with_associations =
        UserSerializer.new(@users, { params: { :userlist => true } }).hash_for_collection[:data].map { | user |
          user[:attributes]
        }

    json_response({ data: contact_records_with_associations, pagy: pagy_metadata(@pagy) })
  end

  # POST /users
  def create
    @user = User.create!(user_params)
    json_response(@user, :created)
  end

  def toggle_enable
    if @user.enabled? then
      @user.disabled_at = Time.now
    else
      @user.disabled_at = nil
    end
    @user.save!
    json_response(UserSerializer.new(@user, { params: { :userlist => false } }).serializable_hash[:data][:attributes], :ok)
  end

  # GET /users/:id
  def show
    respond_to do | format |
      format.json { json_response(UserSerializer.new(@user, { params: { :userlist => false } }).serializable_hash[:data][:attributes]) }
    end
  end

  # PUT /users/:id
  def update
    if @user.update(user_params)
        json_response(UserSerializer.new(@user, { params: { :userlist => false } }).serializable_hash[:data][:attributes], :ok)
    else
      warden.custom_failure!
      message_key = @user.errors.keys().first
      json_response({ "message": "#{message_key.capitalize} #{user.errors[message_key].first}" }, :unprocessable_entity)
    end
  end

  # DELETE /users/:id
  def destroy
    @user.destroy
    json_response({}, :ok)
  end

  private

  def user_params
    # whitelist user params
    params.require(:user).permit!
  end

  def set_user
    begin
      @user = User.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      logger.error(":::Attempt to access invalid user_id => #{params[:id]}")
      head :not_found
    end
  end
end