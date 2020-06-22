class Api::V1::PrioritiesController < ApplicationController
  skip_before_action :verify_authenticity_token # Revert later once we have csrf
  respond_to :json

  def index
    @priorities = Priority.select(:name, :id)
    json_response(@priorities)
  end
end