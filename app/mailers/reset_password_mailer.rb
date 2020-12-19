class ResetPasswordMailer < ApplicationMailer
  default from: "<#{defined?(ENV['app_email']) ? ENV['app_email'] : "ticketmule@example.com"}>"
  before_action :add_inline_attachments!

  def reset_password_instructions(record, token, opts = {})
    super
  end

  def edit_ticketmule_password_url(user)
    "#{ENV['host']}/reset_password?reset_token=#{user.reset_password_token}&username=#{user.username}"
  end

  def reset_password(user)
    @reset_password_url = edit_ticketmule_password_url(user)
    mail_obj = mail(:to => user.email,
                    from: ENV['app_email'], :date => Time.now, :subject => "Ticketmule: Reset password...")
    mail_obj.deliver!
  end

  private

  def add_inline_attachments!
    attachments.inline['ticketmule-logo.jpg'] = File.read(Rails.root.join('app/assets/images/ticketmule-logo.jpg'))
  end
end