class ApplicationMailbox < ActionMailbox::Base
  # routing /something/i => :somewhere
  routing RepliesMailbox::MATCHER => :replies
  routing TicketsMailbox::MATCHER => :tickets
  #routing :all => :replies
end
