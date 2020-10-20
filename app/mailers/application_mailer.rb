class ApplicationMailer < ActionMailer::Base
  default from: APP_CONFIG['app_email']
  layout 'mailer'
end
