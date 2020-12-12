class Api::V1::GroupsController < ApplicationController
  skip_before_action :verify_authenticity_token # Revert later once we have csrf
  respond_to :json

  def index
    @groups = Group.select(:name, :id)
    json_response(@groups, :ok)
  end

  # POST /groups
  def create
    @group = Group.create!(group_params)
    json_response(OptionSerializer.new(@group).serializable_hash[:data][:attributes], :created)
  end

  private

  def group_params
    # whitelist group params
    params.require(:group).permit!
  end
end