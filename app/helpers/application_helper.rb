module ApplicationHelper
  def nice_date(date)
    # 31 Jan 2009 12:00 pm
    date.strftime("%d %b %Y %I:%M %p")
  end

  def comment_with_attributes(comment)
    comment.attributes.merge(
        'user' => comment.user
    )
  end

  def ticket_with_attributes(ticket)
    ticket.attributes.merge(
        'group' => ticket.group,
        'contact' => ticket.contact,
        'creator' => ticket.creator,
        'priority' => ticket.priority,
        'status' => ticket.status,
        'time_type' => ticket.time_type,
        'owner' => ticket.owner,
        )
  end

  def ticket_with_related_records(ticket)
    ticket.attributes.merge(
        'comments' => ticket.comments.map do | comment |
          comment_with_attributes comment
        end,
        'alerts' => ticket.alerts
    )
  end
end
