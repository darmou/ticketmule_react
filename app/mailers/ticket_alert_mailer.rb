class TicketAlertMailer < ApplicationMailer
  helper :application

  def ticket_alert(ticket, users, comment)
    @ticket = ticket
    @audit_comment = comment
    mail_obj = mail(:to => ticket.owner.email,:bcc => users,
         from: APP_CONFIG['app_email'], :date => Time.now, :subject => "Ticket ##{ticket.id} was updated...")

    mail_obj.deliver!
=begin
    users.each do |user|


    end
        subject       "Ticket ##{ticket.id} was updated..."
    from          APP_CONFIG['app_email']
    bcc           users
    sent_on       Time.now
    body          :ticket => ticket, :audit_comment => comment
=end
  end
end
