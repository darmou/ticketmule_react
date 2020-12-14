class Api::V1::TicketsController < ApplicationController
  include Devise::Controllers::Helpers
  before_action :set_ticket, only: [:show, :update, :destroy]

  # GET /tickets
  def index
    tickets = Ticket.all_relevant_tickets
    @pagy, @tickets = pagy(tickets)
    ticket_records_with_associations =
        TicketSerializer.new(@tickets, { params: { :ticketlist => true } }).hash_for_collection[:data].map { | ticket |
      ticket[:attributes]
    }
    json_response({ data: ticket_records_with_associations,
                   pagy: pagy_metadata(@pagy) })
  end

  # POST /tickets
  def create
    @ticket = Ticket.create!(ticket_params)
    json_response(TicketSerializer.new(@ticket, { params: { :ticketlist => false, :user_id => @user.id } }).serializable_hash[:data][:attributes], :created)
  end

  # GET /tickets/:id
  def show
    begin
      @ticket = Ticket.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      logger.error(":::Attempt to access invalid ticket_id => #{params[:id]}")
      head :not_found
    end
    respond_to do | format |
      format.json { json_response(TicketSerializer.new(@ticket, { params: { :ticketlist => false, :user_id => @user.id } }).serializable_hash[:data][:attributes]) }
      format.pdf do
        pdf = TicketPdf.new(@ticket)
            send_data pdf.render,
                  filename: "#{@ticket.id}.pdf",
                  type: "application/pdf",
                  disposition: "inline"
      end
    end

  end

  # PUT /tickets/:id
  def update
    @ticket.update(ticket_params)
    json_response({}, :ok)
  end

  # DELETE /tickets/:id
  def destroy
    @ticket.destroy
    json_response({}, :ok)
  end

  private

  def ticket_params
    # whitelist ticket params
    params.require(:ticket).permit!
  end

  def set_ticket
    @ticket = Ticket.find(params[:id])
  end
end