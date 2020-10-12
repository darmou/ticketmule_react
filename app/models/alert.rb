class Alert < ApplicationRecord
  # Default Order
  default_scope { order(created_at: :desc) }

  # Associations
  belongs_to :ticket
  belongs_to :user
end
