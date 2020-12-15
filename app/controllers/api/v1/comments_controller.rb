class Api::V1::CommentsController < ApplicationController
  include Devise::Controllers::Helpers
  before_action :set_comment, only: [:show, :destroy]

  def create
    @ticket = Ticket.find(params[:ticket_id])
    @comment = @ticket.comments.build(comment_params.except(:close_ticket))
    @comment.user_id = @user.id

    if comment_params[:close_ticket]
      status = Status.find_by(name: 'Closed')
      @ticket.status_id = status.id
      @ticket.save
      @comment.comment = "<strong>Status</strong> changed to closed<br/>" + @comment.comment
    end

    respond_to do |format|
      format.json {
        if (@comment.comment.blank?)
          json_response("ResourceItem must not be empty!", :bad_request)
        end
        if @comment.save
          json_response(@comment, :created)
        else
          json_response(@comment.errors.full_messages, :bad_request)
        end
      }
    end
  end

  def destroy
    @comment.destroy
    json_response({}, :ok)
  end

  private

  def comment_params
    # whitelist comment params
    params.require(:comment).permit!
  end

  def set_comment
    @comment = Comment.find(params[:id])
  end
end