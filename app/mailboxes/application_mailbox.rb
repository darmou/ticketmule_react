class ApplicationMailbox < ActionMailbox::Base
  REPLIES_MATCHER = /reply-(.+)@reply.example.com/i
  TICKETS_MATCHER = /ticket-(.+)@ticket.example.com/i
  # routing /something/i => :somewhere
  routing REPLIES_MATCHER => :replies
  routing TICKETS_MATCHER => :tickets
  #routing :all => :replies
end
