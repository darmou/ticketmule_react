class TicketsMailbox < ApplicationMailbox
  include ApplicationHelper

  before_processing :ensure_user

  def process
    return if user.nil?

    # valid ticket example
    #Ticket.new(:title=> "woot", :details=>"blt", :status=> Status.find(1), :group=> Group.find(1),:time_type=> TimeType.find(1),:contact=>Contact
    # .find(1),:creator=>User.find(1),:priority=>Priority.find(1), :owner=> User.find(1))
    #
    ticket_message = mail.decoded
    yaml_message = YAML.load(ticket_message).first
    group = Group.find_by(:name => yaml_message[:group].capitalize)
    time_type = Group.find_by(:name => yaml_message[:time_type].capitalize)
    status = nil
    if yaml_message.include(:status)
      status = Group.find_by(:name => yaml_message[:status].capitalize)
    end
    if status.nil?
      status = Status.find_by(:name=>"Open")
    end
    contact = Contact.find_by(:email=>yaml_message[:contact])
    priority = Priority.find_by(:name => yaml_message[:priority].capitalize)
    ticket = Ticket.new(:title=> yaml_message[:title],
                        :details=> yaml_message[:details],
                        :status=> status, :group=> group,
                        :time_type=> time_type,
                        :contact=> contact,
                        :priority => priority,
                        :creator=> user,
                        :owner=> user)
    ticket.save!
    if ticket.errors.messages.keys.count > 0
      errors = JSON.pretty_generate(ticket.errors.messages)
      bounce_with TicketAlertMailer.invalid_ticket_request(errors, user)
    end

  end
end
