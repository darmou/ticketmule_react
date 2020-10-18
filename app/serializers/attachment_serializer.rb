class AttachmentSerializer
  include JSONAPI::Serializer
  attributes :user, :data_file_name, :data_content_type, :data_file_size, :id


  attribute :url do |object|
    object.url
  end
end
