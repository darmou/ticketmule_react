class ResetPasswordMailerPreview < ActionMailer::Preview
  def reset_password
    ResetPasswordMailer.with(user: User.first).reset_password(User.first)
  end
end