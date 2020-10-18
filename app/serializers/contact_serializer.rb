class ContactSerializer
  include JSONAPI::Serializer
  attributes :id, :first_name, :last_name, :email, :mobile_phone, :office_phone, :affliation, :notes, :disabled_at, :created_at, :updated_at
end
