class TimeType < ApplicationRecord
  acts_as_reportable
  # Associations
  has_many :tickets

  # Scopes
  scope :enabled, -> { where(order: 'name', conditions: { disabled_at: nil } ) }
  scope :disabled, -> { where(:order => 'name', :conditions => ['disabled_at IS NOT NULL'] ) }

  # Validations
  validates_presence_of :name
  validates_uniqueness_of :name, :case_sensitive => false

  # for css purposes, distinguish between standard or custom time type
  def standard?
    self.name.downcase == "trivial" || self.name.downcase == "medium" || self.name.downcase == "major project"
  end

  def enabled?
    disabled_at.blank?
  end
end
