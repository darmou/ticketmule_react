class Api::V1::AttachmentsController < ApplicationController
  include Devise::Controllers::Helpers
  before_action :set_attachment, only: [:show, :destroy]

  def create
    @ticket = Ticket.find(params[:ticket_id])
    @attachment = @ticket.attachments.build(attachment_params)
    @attachment.data_file_name = attachment_params[:data].original_filename
    @attachment.data_content_type = attachment_params[:data].content_type
    @attachment.data_file_size = attachment_params[:data].size
    @attachment.user_id = @user.id

    respond_to do |format|
      format.json {
        if (@attachment.name.blank?)
          json_response("Attachment name must not be empty!", :bad_request)
        end
        if @attachment.save

          json_response(AttachmentSerializer.new(@attachment).serializable_hash, :created)
        else
          json_response(@attachment.errors.full_messages, :bad_request)
        end
      }
    end
  end


  def destroy
    @attachment.destroy
    json_response({})
    head :ok
  end

  private

  def attachment_params
    # whitelist attachment params
    params.require(:attachment).permit(:data)
  end

  def set_attachment
    @attachment = Attachment.find(params[:id])
  end
end