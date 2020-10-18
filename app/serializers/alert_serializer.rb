class AlertSerializer
  include JSONAPI::Serializer
  attributes :id, :user_id, :ticket_id, :created_at, :updated_at
end
