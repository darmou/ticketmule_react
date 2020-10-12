class Api::V1::TicketsController < ApplicationController
  include Devise::Controllers::Helpers
  before_action :set_ticket, only: [:show, :update, :destroy]
  skip_before_action :verify_authenticity_token # Revert later once we have csrf

  # GET /tickets
  def index
    if params[:type] and params[:type] == 'CLOSED'
      tickets = Ticket.closed_tickets.ticket_includes
    else
      tickets = Ticket.not_closed.ticket_includes
    end
    ticket_records_with_associations = tickets.map do |ticket|
      helpers.ticket_with_attributes ticket
    end
    paginate json: ticket_records_with_associations
  end

  # POST /tickets
  def create
    @ticket = Ticket.create!(ticket_params)
    json_response(@ticket, :created)
  end

  # GET /tickets/:id
  def show
    begin
      Ticket.where(id: params[:id]).ticket_includes.with_related_records
      ticket_with_attributes = helpers.ticket_with_attributes @ticket
      ticket_with_records = helpers.ticket_with_related_records @ticket
    rescue ActiveRecord::RecordNotFound
      logger.error(":::Attempt to access invalid ticket_id => #{params[:id]}")
      head :not_found
    end
    respond_to do | format |
      format.json { json_response(ticket_with_attributes.merge(ticket_with_records)) }
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
    params.require(:ticket).permit!
  end

  def set_ticket
    @ticket = Ticket.find(params[:id])
  end
end