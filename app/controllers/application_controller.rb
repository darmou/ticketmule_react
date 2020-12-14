class ApplicationController < ActionController::Base
  include Rails::Pagination
  include Pagy::Backend
  include Response
  include ExceptionHandler
  before_action :require_login
  skip_before_action :verify_authenticity_token # Revert later once we have csrf

  private

  def require_login
    if request.env['PATH_INFO'].start_with?("/api/v1/tickets")
      token = request.headers["HTTP_X_USER_TOKEN"]
      email = request.headers["HTTP_X_USER_EMAIL"]
      @user = User.where(email: email, authentication_token: token).first
      user = (@user) ? @user : current_api_v1_user
      if(!user)
        head(:unauthorized)
      end
    end
  end
end
