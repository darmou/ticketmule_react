class Notifier < ActionMailer::Base
  default_url_options[:host] = APP_CONFIG['domain_name']

  #def deliver_owner_alert(ticket)
  #  admin = User.find(:first, :conditions => [ "admin = ?", true])
  #  mail(   :to => ticket.owner.email,
  #              :from => '"#{admin.first_name} #{admin.last_name}" <#{admin.email}>',
  #              :subject => "#{ticket.owner.first_name} #{ticket.owner.last_name} created a new ticket for '#{ticket.title}'")
  #end

  def password_reset_instructions(user)
    subject       "Password Reset Instructions"
    from          APP_CONFIG['app_email']
    recipients    user.email
    sent_on       Time.now
    body          :edit_password_reset_url => edit_password_url(user, user.perishable_token)
  end

  def ticket_alert(ticket, users, comment)
    subject       "Ticket ##{ticket.id} was updated..."
    from          APP_CONFIG['app_email']
    bcc           users
    sent_on       Time.now
    body          :ticket => ticket, :audit_comment => comment
  end

  def owner_alert(ticket,owner_email)
    subject       "Ticket ##{ticket.id} was assigned to you..."
    from          APP_CONFIG['app_email']
    recipients    owner_email
    sent_on       Time.now
    body          :ticket => ticket
  end
end