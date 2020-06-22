class Contact < ApplicationRecord
  # Associations
  has_many :tickets

  # Scopes
  scope :enabled, -> { where(disabled_at: nil) && order(last_name: :asc) }

  # Validations
  validates_presence_of :last_name
  #validates_format_of :email, :with => Authlogic::Regex.email

  def full_name
    if first_name.blank?
      last_name
    else
      [last_name, first_name].compact.join(', ')
    end
  end

  def enabled?
    disabled_at.blank?
  end
end
