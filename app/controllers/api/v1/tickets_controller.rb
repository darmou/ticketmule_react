class Api::V1::TicketsController < ApplicationController
  include Devise::Controllers::Helpers
  before_action :set_ticket, only: [:show, :update, :destroy]
  before_action :authenticate_api_v1_user!

  # GET /tickets
  def index
    @tickets = Ticket.all
    json_response(@tickets)
  end

  # POST /tickets
  def create
    @ticket = Ticket.create!(ticket_params)
    json_response(@ticket, :created)
  end

  # GET /tickets/:id
  def show
    json_response(@ticket)
  end

  # PUT /tickets/:id
  def update
    @ticket.update(ticket_params)
    head :no_content
  end

  # DELETE /tickets/:id
  def destroy
    @ticket.destroy
    head :no_content
  end

  private

  def ticket_params
    # whitelist ticket params
    #params.permit(:title, :created_by)
    params.require(:ticket).permit!
  end

  def set_ticket
    @ticket = Ticket.find(params[:id])
  end
end