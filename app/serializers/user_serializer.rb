class UserSerializer
  include JSONAPI::Serializer
  attributes :id, :email, :username, :first_name, :last_name, :admin, :last_sign_in_at, :created_at,
             :disabled_at, :time_zone, :last_sign_in_ip

  attribute :full_name do | object |
    object.full_name
  end

  attribute :alerts, if: Proc.new { |record, params|
    not params[:userlist]
  } do |object|
    AlertSerializer.new(object.alerts).serializable_hash[:data].map { | alert |
      alert[:attributes]
    }
  end
end
