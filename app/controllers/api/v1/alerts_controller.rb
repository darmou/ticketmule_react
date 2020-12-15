class Api::V1::AlertsController < ApplicationController
  include Devise::Controllers::Helpers

  def create
    @ticket = Ticket.find(params[:ticket_id])
    @alert = @user.alerts.build(:ticket_id => @ticket.id)

    respond_to do |format|
      format.json {
        if @user.has_ticket_alert?(@ticket.id) or @alert.save
          json_response("Your alert was added and you will now receive an email any time this ticket is updated!!", :ok)
        else
          json_response(@alert.errors.full_messages, :unprocessable_entity)
        end
      }
    end
  end

  def destroy
    # for the current user (@user), delete the alert with the incoming ticket id
    #alert = Alert.find_by_ticket_id_and_user_id(params[:id], @user.id)
    if @user.admin?
      alert = Alert.find(params[:id])
    else
      alert = Alert.find_by_id_and_user_id(params[:id], @user.id)
    end
    ticket_id = alert.ticket_id
    alert.destroy

    respond_to do |format|
      format.json {
        json_response({:ticket_id => ticket_id}, :ok)
      }
    end
  end

  def alert_params
    # whitelist alert params
    params.require(:alert).permit!
  end

end
