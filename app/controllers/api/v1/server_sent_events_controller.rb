class Api::V1::ServerSentEventsController < ApplicationController
  include ActionController::Live

  # When a user or ticket changes let front end know to reload
  def watch
    response.headers['Content-Type'] = 'text/event-stream'
    sse = SSE.new(response.stream, retry: 1000, event: "ticket")
    last_updated = Ticket.last_updated.first()
    user_updated = User.last_updated.first()
    contact_updated = Contact.last_updated.first()
    if  recently_changed? last_updated
      sse.write({:id=>last_updated.id, :updated_at=> last_updated.updated_at}, event: "ticket")
    end

    if recently_changed? user_updated
      sse.write({:id=>user_updated.id, :updated_at=> user_updated.updated_at}, event: "user")
    end

    if recently_changed? contact_updated
      sse.write({:id=>contact_updated.id, :updated_at=> contact_updated.updated_at}, event: "contact")
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