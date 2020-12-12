class Api::V1::TimeTypesController < ApplicationController
  skip_before_action :verify_authenticity_token # Revert later once we have csrf
  respond_to :json

  def index
    @time_types = TimeType.select(:name,:id)
    json_response(@time_types)
  end

  # POST /statuses
  def create
    @time_type = TimeType.create!(time_type_params)
    json_response(OptionSerializer.new(@time_type).serializable_hash[:data][:attributes], :created)
  end

  private

  def time_type_params
    # whitelist time_type params
    params.require(:time_type).permit!
  end
end
