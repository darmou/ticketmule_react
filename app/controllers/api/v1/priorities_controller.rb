class Api::V1::PrioritiesController < ApplicationController
  skip_before_action :verify_authenticity_token # Revert later once we have csrf
  respond_to :json

  def index
    @priorities = Priority.select(:name, :id)
    json_response(@priorities)
  end

  # POST /priorities
  def create
    @priority = Priority.create!(priority_params)
    json_response(OptionSerializer.new(@priority).serializable_hash[:data][:attributes], :created)
  end

  private

  def priority_params
    # whitelist priority params
    params.require(:priority).permit!
  end
end