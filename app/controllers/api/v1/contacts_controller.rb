class Api::V1::ContactsController < ApplicationController
  include Devise::Controllers::Helpers
  before_action :set_contact, only: [:show, :update, :destroy]

  # GET /contacts
  def index
    if params[:letter]
      last_name = Contact.arel_table[:last_name]
      contacts = Contact.where(last_name.matches("#{params[:letter]}%"))
    else
      contacts = Contact.all
    end
    @pagy, @contacts = pagy(contacts)
    contact_records_with_associations =
        ContactSerializer.new(@contacts).hash_for_collection[:data].map { | contact |
          contact[:attributes]
        }

    json_response({ data: contact_records_with_associations, pagy: pagy_metadata(@pagy) })
  end

  # POST /contacts
  def create
    @contact = Contact.create!(contact_params)
    json_response(@contact, :created)
  end

  def toggle_enable
    @contact = Contact.find(params[:id])
    if @contact.enabled? then
      @contact.disabled_at = Time.now
    else
      @contact.disabled_at = nil
    end
    @contact.save!
    json_response(ContactSerializer.new(@contact).serializable_hash[:data][:attributes], :ok)
  end

  # GET /contacts/:id
  def show
    begin
      @contact = Contact.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      logger.error(":::Attempt to access invalid contact_id => #{params[:id]}")
      head :not_found
    end
    respond_to do | format |
      format.json { json_response(ContactSerializer.new(@contact).serializable_hash[:data][:attributes]) }
    end

  end

  # PUT /contacts/:id
  def update
    @contact.update(contact_params)
    json_response(ContactSerializer.new(@contact).serializable_hash[:data][:attributes], :ok)
  end

  # DELETE /contacts/:id
  def destroy
    @contact.destroy
    json_response({}, :ok)
  end

  private

  def contact_params
    # whitelist contact params
    params.require(:contact).permit!
  end

  def set_contact
    @contact = Contact.find(params[:id])
  end
end