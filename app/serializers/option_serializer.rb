class OptionSerializer
  include JSONAPI::Serializer
  attributes :id, :name, :disabled_at
end