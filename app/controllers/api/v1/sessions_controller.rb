class Api::V1::SessionsController < Devise::SessionsController
  respond_to :json
  skip_before_action :verify_authenticity_token

  def create
    user = User.where(username: user_params[:username]).first
    if user&.valid_password?(user_params[:password])
      sign_in("user", user)
      render json: user.as_json(only: [:email, :authentication_token, :username]), status: :created
    else
      head(:unauthorized)
    end
  end

  def destroy
    current_api_v1_user.authentication_token = nil
    current_api_v1_user.save!
    head(:no_content)
  end



  def new
    token = request.headers["X-User-Token"]
    email = request.headers["X-User-Email"]
    @user = User.where(email: email, authentication_token: token).first
    user = (@user) ? @user : current_api_v1_user
    if(user)
      self.sign_in_and_redirect user, :event => :authentication
    else
      head(:unauthorized)
    end
  end

  private

  def user_params
    # It's mandatory to specify the nested attributes that should be whitelisted.
    # If you use `permit` with just the key that points to the nested attributes hash,
    # it will return an empty hash.
    params.require(:user).permit(:username, :password)
  end

end