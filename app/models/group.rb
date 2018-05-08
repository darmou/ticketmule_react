class Group < ApplicationRecord
  # Associations
  has_many :tickets

  # Scopes
  scope :enabled, -> { where(order: 'name', conditions: { disabled_at: nil }) }
  scope :disabled, -> { where(order: 'name', conditions: ['disabled_at IS NOT NULL']) }

  # Validations
  validates_presence_of :name
  validates_uniqueness_of :name, :case_sensitive => false

  def enabled?
    disabled_at.blank?
  end
end
