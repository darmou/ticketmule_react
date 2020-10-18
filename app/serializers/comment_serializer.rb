class CommentSerializer
  include JSONAPI::Serializer
  attributes :comment, :id, :user
  belongs_to :user
end
