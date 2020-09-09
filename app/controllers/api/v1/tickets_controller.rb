class Api::V1::TicketsController < ApplicationController
  include Devise::Controllers::Helpers
  before_action :set_ticket, only: [:show, :update, :destroy]
  skip_before_action :verify_authenticity_token # Revert later once we have csrf

  # GET /tickets
  def index
    tickets = Ticket.all.includes(
        :group,
        :contact,
        :creator,
        :priority,
        :status,
        :time_type,
        :owner
        )
    ticket_records_with_associations = tickets.map do |ticket|
      ticket.attributes.merge(
          'group' => ticket.group,
          'contact' => ticket.contact,
          'creator' => ticket.creator,
          'priority' => ticket.priority,
          'status' => ticket.status,
          'time_type' => ticket.time_type,
          'owner' => ticket.owner,
      )
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
    respond_to do | format |
      format.json { json_response(@ticket)}
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
    #params.permit(:title, :created_by)
    params.require(:ticket).permit!
  end

  def set_ticket
    @ticket = Ticket.find(params[:id])
  end
end