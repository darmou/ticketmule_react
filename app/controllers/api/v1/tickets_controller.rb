class Api::V1::TicketsController < ApplicationController
  include Devise::Controllers::Helpers
  before_action :set_ticket, only: [:show, :update, :destroy]

  # GET /tickets
  def index
    title = nil
    if params[:search]
      if !search_params[:title].blank?
        title = Ticket.arel_table[:title]
        query = search_params[:title]
        params[:search].delete(:title)
      end
      if !search_params[:created_at_gte].blank?
        start_date = DateTime.parse(params[:search][:created_at_gte])
        start_date = start_date.midnight.gmtime
        params[:search][:created_at] = start_date..Float::INFINITY
        params[:search].delete(:created_at_gte)
      end
      if !search_params[:created_at_lt].blank?
        end_date = DateTime.parse(search_params[:created_at_lt])
        end_date = end_date.next.midnight.gmtime
        search_params[:created_at] = -Float::INFINITY..end_date
        params[:search].delete(:created_at_lt)
      end
      if title then
        tickets = (search_params.empty?) ? Ticket.where(title.matches("%#{query}%")) :
                    Ticket.where(search_params).where(title.matches("%#{query}%"))
      else
        tickets = Ticket.where(search_params)
      end

    else
      tickets = Ticket.all_relevant_tickets
    end


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
    json_response(@ticket, :ok)
  end

  # DELETE /tickets/:id
  def destroy
    @ticket.destroy
    json_response({}, :ok)
  end

  private

  def search_params
    params[:search].empty? ? {} : params.require(:search).permit!.to_h.symbolize_keys
  end

  def json_obj(resource, type)
    json = resource.as_json(only: [:id, :last_last_updated_at])
    json[:type] = type
  end

  def ticket_params
    # whitelist ticket params
    params.require(:ticket).permit!
  end

  def set_ticket
    @ticket = Ticket.find(params[:id])
  end
end