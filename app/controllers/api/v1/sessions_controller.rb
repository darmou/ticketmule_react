class Api::V1::SessionsController < Devise::SessionsController
  respond_to :json
  skip_before_action :verify_authenticity_token

  def create
    binding.pry
    user = User.where(username: user_params[:username]).first
    if user&.valid_password?(user_params[:password])
      sign_in("user", user)
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

  private

  def user_params
    # It's mandatory to specify the nested attributes that should be whitelisted.
    # If you use `permit` with just the key that points to the nested attributes hash,
    # it will return an empty hash.
    params.require(:user).permit(:username, :password)
  end

end