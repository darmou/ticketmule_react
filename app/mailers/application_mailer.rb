class ApplicationMailer < ActionMailer::Base
  default from: defined? ENV['app_email'] ? ENV['app_email'] : "ticketmule@example.com"
  layout 'mailer'
end
