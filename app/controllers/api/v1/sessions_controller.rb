class Api::V1::SessionsController < Devise::SessionsController
  respond_to :json

  def create
    user = User.where(username: params[:username]).first
    if user&.valid_password?(params[:password])
      render json: user.as_json(only: [:username, :authentication_token]), status: :created
    else
      head(:unauthorized)
    end
  end

  def destroy
    current_user.authentication_token = nil
    current_user.save!
    head(:no_content)
  end

  def new
    head(:unauthorized)
  end
end