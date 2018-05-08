class Priority < ApplicationRecord
  acts_as_reportable
  # Associations
  has_many :tickets

  # Scopes
  scope :enabled, -> { where(order: 'name', conditions: { disabled_at: nil } ) }
  scope :disabled, -> { where(:order => 'name', :conditions => ['disabled_at IS NOT NULL'] ) }

  # Validations
  validates_presence_of :name
  validates_uniqueness_of :name, :case_sensitive => false

  # for css purposes, distinguish between standard or custom priority
  def standard?
    self.name.downcase == "urgent" || self.name.downcase == "standard" || self.name.downcase == "low"
  end

  def enabled?
    disabled_at.blank?
  end
end
