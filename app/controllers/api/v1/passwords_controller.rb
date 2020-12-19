class Api::V1::PasswordsController < Devise::PasswordsController
  respond_to :json

  # PATCH /resource/password

  def update
    user = User.where(reset_password_token: user_params[:reset_password_token]).first
    if user
      user.password = user_params[:password]
      user.reset_password_token = nil # will need to be regenerated
      user.save!
      render json: user.as_json(only: [:email, :authentication_token, :username, :last_sign_in_at, :last_sign_in_ip, :id]), status: :created
    else
      json_response(:not_found)
    end

  end
  # POST /resource/password
  def create
    user = User.where(email: user_params[:email]).first
    if user
      user.deliver_password_reset_instructions!
      json_response({message: "email sent"}, :ok)
    else
      json_response({error: "invalid user"}, :bad_request)
    end
  end

  private

  def user_params
    # whitelist user params
    params.require(:user).permit!
  end
end