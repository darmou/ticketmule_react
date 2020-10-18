class TicketSerializer
  include JSONAPI::Serializer

  attributes  :id, :time_type, :group, :priority, :title, :status, :details, :comments_count, :created_at, :updated_at

  attribute :contact do |object|
    object.contact
  end

  attribute :owner do | object |
    object.owner
  end

  attribute :comments, if: Proc.new { |record, params|
    not params[:ticketlist]
  } do |object|
    CommentSerializer.new(object.comments).serializable_hash[:data].map { | comment |
      comment[:attributes]
    }
  end


  attribute :attachments, if: Proc.new { |record, params|
    not params[:ticketlist]
  } do |object|
    AttachmentSerializer.new(object.attachments).serializable_hash[:data].map { | attachment |
      attachment[:attributes]
    }
  end

  attribute :alert, if: Proc.new { | record, params |
    not params[:ticketlist]
  } do | object, params |
    alerts = AlertSerializer.new(object.alerts).serializable_hash[:data].filter { | alert |
      alert[:attributes][:user_id] == params[:user_id]
    }
    alerts.length > 0 ? alerts[0] : nil
  end
end
