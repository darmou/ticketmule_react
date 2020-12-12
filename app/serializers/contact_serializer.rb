class ContactSerializer
  include JSONAPI::Serializer
  attributes :id, :first_name, :last_name, :email, :mobile_phone, :office_phone, :affiliation, :notes, :disabled_at, :created_at, :updated_at

  attribute :is_enabled do | object |
    object.enabled?
  end

  attribute :full_name do | object |
    object.full_name
  end

end
