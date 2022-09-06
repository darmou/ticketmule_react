class Api::V1::ServerSentEventsController < ApplicationController
  include ActionController::Live

  # When a user or ticket changes let front end know to reload
  def watch
    response.headers['Content-Type'] = 'text/event-stream'
    sse = SSE.new(response.stream, retry: 1000, event: "ticket")
    last_updated = Ticket.last_updated.first()
    user_updated = User.last_updated.first()
    contact_updated = Contact.last_updated.first()
    if not last_updated.nil? and recently_changed? last_updated
      ticket_records_with_associations =
        TicketSerializer.new(last_updated, { params: { :ticketlist => false }}).serializable_hash[:data][:attributes]
      sse.write(ticket_records_with_associations, event: "ticket")
    end

    if not user_updated.nil? and recently_changed? user_updated
      user_with_associations = UserSerializer.new(user_updated, { params: { :userlist => false } }).serializable_hash[:data][:attributes]
      sse.write(user_with_associations, event: "user")
    end

    if not contact_updated.nil? and recently_changed? contact_updated
      contact_with_associations = ContactSerializer.new(contact_updated).serializable_hash[:data][:attributes]
      sse.write(contact_with_associations, event: "contact")
    end
  ensure
      sse.close
  end

  private

  def recently_changed? last_resource
    last_resource.created_at > 5.seconds.ago or
      last_resource.updated_at > 5.seconds.ago
  end

end