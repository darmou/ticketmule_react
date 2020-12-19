module ApplicationHelper
  def nice_date(date)
    # 31 Jan 2009 12:00 pm
    date.strftime("%d %b %Y %I:%M %p")
  end

  def ticket_url(ticket)
    "#{ENV['host']}/tickets/#{ticket.id}"
  end

  def user
    @user ||= User.find_by(:email => mail.from) #.addresses[0] ?
  end

  def ensure_user
    if user.nil?
      bounce_with TicketAlertMailer.missing(inbound_email)
    end
  end
end
