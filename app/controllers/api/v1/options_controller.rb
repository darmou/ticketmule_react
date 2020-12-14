class Api::V1::OptionsController < ApplicationController
  respond_to :json

  def index
    if (params.include?(:fetchPeople) && params[:fetchPeople] == "true")
      @contact_select = Contact.where(disabled_at: nil).select('id, first_name', 'last_name')
      @owner_select = User.where(disabled_at: nil).select('id, username')
    end
    @group_select = Group.all.select('id, name', 'disabled_at')
    @status_select = Status.all.select('id, name', 'disabled_at')
    @priority_select = Priority.all.select('id, name', 'disabled_at')
    @time_types = TimeType.all.select('id, name', 'disabled_at')

    ret = Hash.new
    if (params.include?(:fetchPeople) && params[:fetchPeople] == "true")
      ret[:contacts] = @contact_select
      ret[:owners] = @owner_select
    end
    ret[:groups] = @group_select
    ret[:statuses] = @status_select
    ret[:priorities] = @priority_select
    ret[:time_types] = @time_types
    json_response(ret, :ok)
  end

  def toggle_enable
    case option_params[:type]
    when "group"
      option = Group.find(params[:id])
    when "status"
      option = Status.find(params[:id])
    when "time_type"
      option = TimeType.find(params[:id])
    when "priority"
      option = Priority.find(params[:id])
    else
      json_response({ error: "You sent type #{option_params[:type]} -- I have no idea what to do with that."}, :bad_request)
    end

    if option.enabled? then
      option.disabled_at = Time.now
    else
      option.disabled_at = nil
    end
    option.save!
    json_response(OptionSerializer.new(option).serializable_hash[:data][:attributes], :ok)
  end

  private

  def option_params
    # whitelist option params
    params.require(:option).permit(:type)
  end
end