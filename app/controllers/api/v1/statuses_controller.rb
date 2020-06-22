class Api::V1::StatusesController < ApplicationController
  skip_before_action :verify_authenticity_token # Revert later once we have csrf
  respond_to :json

  # Get status
  def index
    @statuses = Status.select(:name, :id)
    json_response(@statuses)
  end
end
