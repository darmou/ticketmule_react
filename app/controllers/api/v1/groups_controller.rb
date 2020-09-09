class Api::V1::GroupsController < ApplicationController
  skip_before_action :verify_authenticity_token # Revert later once we have csrf
  respond_to :json

  def index
    @groups = Group.select(:name, :id)
    paginate json: @groups
  end
end