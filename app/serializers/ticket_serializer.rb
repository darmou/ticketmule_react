class TicketSerializer
  include JSONAPI::Serializer

  attributes  :id, :time_type, :group, :priority, :title, :status, :details, :comments_count, :created_at, :updated_at

  attribute :contact do |object|
    if (object.contact)
      ContactSerializer.new(object.contact).serializable_hash[:data][:attributes]
    else
      nil
    end
  end

  attribute :owner do | object |
    if (object.owner)
      UserSerializer.new(object.owner).serializable_hash[:data][:attributes]
    else
      nil
    end
  end

  attribute :creator do | object |
    UserSerializer.new(object.creator).serializable_hash[:data][:attributes]
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
    filtered_alerts = object.alerts.select { | alert |
      alert.user_id == params[:user_id]
    }
    filtered_alerts.length > 0 ? AlertSerializer.new(filtered_alerts.first).serializable_hash[:data][:attributes] : nil
  end
end
