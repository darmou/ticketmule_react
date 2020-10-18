class UserSerializer
  include JSONAPI::Serializer
  attributes :id, :email, :username, :first_name, :last_name, :admin, :created_at, :disabled_at, :time_zone
end
