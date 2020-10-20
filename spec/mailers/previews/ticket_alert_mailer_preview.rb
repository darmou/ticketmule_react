class TicketAlertMailerPreview < ActionMailer::Preview
  def ticket_alert
    TicketAlertMailer.with(ticket: Ticket.first, users: [], comment: nil).ticket_alert(Ticket.first, [], nil)
  end
end