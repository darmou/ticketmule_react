class TicketAlertMailer < ApplicationMailer
  helper :application

  def missing(inbound_email)
    @inbound_email = inbound_email
    mail_obj = mail(:to => inbound_email, from: ENV['app_email'],
                    :date => Time.now, :subject => "TicketMule: Your email address is not registered")
    mail_obj.deliver!
  end

  def invalid_ticket_request(errors, user)
    @errors = errors

    mail_obj = mail(:to => user.email, from: ENV['app_email'],
                    :date => Time.now, :subject => "TicketMule: Invalid new ticket request")
    mail_obj.deliver!
  end

  def ticket_alert(ticket, users, comment)
    @ticket = ticket
    @audit_comment = comment
    mail_obj = mail(:to => ticket.owner.email,:bcc => users,
         from: ENV['app_email'], :date => Time.now, :subject => "TicketMule: Ticket ##{ticket.id} was updated...")

    mail_obj.deliver!
=begin
    users.each do |user|


    end
        subject       "Ticket ##{ticket.id} was updated..."
    from          ENV['app_email']
    bcc           users
    sent_on       Time.now
    body          :ticket => ticket, :audit_comment => comment
=end
  end
end
