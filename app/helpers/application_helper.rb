module ApplicationHelper
  def nice_date date
    # 31 Jan 2009 12:00 pm
    date.strftime("%d %b %Y %I:%M %p")
  end
end
