class RepliesMailbox < ApplicationMailbox
  MATCHER = /reply-(.+)@reply.example.com/i
  include ApplicationHelper

  # examlple
  # reply-1@reply.example.com
  # mail => Mail object    # Note get subject out of inbox
  # mail
  # inbound_email => ActionMailbox::InboundEmail record
  #
  before_processing :ensure_user

  def process
    return if user.nil?

    ticket.comments.create(
      user: user,
      comment: mail.decoded
    )
  end


  def ticket
    @ticket ||= Ticket.find(ticket_id)
  end

  def ticket_id
    recipient = mail.recipients.find { |r | MATCHER.match(r) }
    recipient[MATCHER, 1]
  end


end
