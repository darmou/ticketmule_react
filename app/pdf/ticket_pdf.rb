class TicketPdf
  include Prawn::View
  include ApplicationHelper

  def initialize(ticket)
    font_setup # this is a new line
    content(ticket)
  end

  # This is the new method with font declaration
  def font_setup
    font_families.update("Montserrat" => {
        :normal => "vendor/assets/fonts/Montserrat/Montserrat-Regular.ttf",
        :italic => "vendor/assets/fonts/Montserrat/Montserrat-Italic.ttf",
        :bold => "vendor/assets/fonts/Montserrat/Montserrat-Bold.ttf",
    })
    font "Montserrat"
  end

  def content ticket
    bounding_box([bounds.left, bounds.top], width: bounds.width, height: bounds.height - 50) do
      text "Ticket ##{ticket.id}", size: 16, style: :bold
      move_down(30)

      font_size(11) do

        text "<b>Title:</b> #{ticket.title}", inline_format: true
        move_down(2)

        data = [["<b>Contact:</b> #{ticket.contact.full_name}", ticket.closed? ? "<b>Closed at:</b> #{nice_date ticket.closed_at}" : ""],
                ["<b>Created at:</b> #{nice_date ticket.created_at}", "<b>Created by:</b> #{ticket.creator.username}"],
                ["<b>Priority:</b> #{ticket.priority.name}","<b>Group:</b> #{ticket.group.name}"],
                ["<b>Status:</b> #{ticket.status.name}","<b>Owner:</b> #{ticket.owner.nil? ? 'Unassigned' : ticket.owner.username}"],
                ["<b>Time Type:</b> #{ticket.time_type_name}"]]

        table data, width: bounds.width, position: -5, cell_style:  { borders:  [], inline_format: true }
        move_down(5)

        text "Details:", style: :bold
        text "#{ticket.details}"
      end
    end
  end
end