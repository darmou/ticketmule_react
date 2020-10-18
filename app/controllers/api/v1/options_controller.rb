class Api::V1::OptionsController < ApplicationController
  respond_to :json

  def index
    @contact_select = Contact.where(disabled_at: nil).select('id, first_name', 'last_name')
    @group_select = Group.where(disabled_at: nil).select('id, name')
    @status_select = Status.where(disabled_at: nil).select('id, name')
    @priority_select = Priority.where(disabled_at: nil).select('id, name')
    @time_types = TimeType.where(disabled_at: nil).select('id, name')
    @owner_select = User.where(disabled_at: nil).select('id, username')
    ret = Hash.new
    ret[:contacts] = @contact_select
    ret[:groups] = @group_select
    ret[:statuses] = @status_select
    ret[:priorities] = @priority_select
    ret[:owners] = @owner_select
    ret[:time_types] = @time_types
    json_response(ret, :ok)
  end
end