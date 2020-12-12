class Api::V1::StatusesController < ApplicationController
  skip_before_action :verify_authenticity_token # Revert later once we have csrf
  respond_to :json

  # Get status
  def index
    @statuses = Status.select(:name, :id)
    json_response(@statuses)
  end

  # POST /statuses
  def create
    @status = Status.create!(status_params)
    json_response(OptionSerializer.new(@status).serializable_hash[:data][:attributes], :created)
  end

  private

  def status_params
    # whitelist status params
    params.require(:status).permit!
  end
end
