class Ticket < ApplicationRecord
  acts_as_reportable

  # Associations
  belongs_to :group
  belongs_to :status
  belongs_to :priority
  belongs_to :time_type
  belongs_to :creator, class_name: "User", foreign_key: "created_by"
  belongs_to :owner, class_name: "User", foreign_key: "owned_by"
  belongs_to :contact
  has_many :comments, dependent: :destroy
  has_many :attachments, dependent: :destroy, class_name: '::Attachment'
  has_many :alerts, dependent: :destroy
  has_many :alert_users, through: :alerts, class_name: 'User', :source => :user

  def priority_name
    priority.name
  end

  def status_name
    status.name
  end

  def time_type_name
    time_type.name
  end

  def group_name
    group.name
  end

  # Validations
  validates_presence_of :title, :group_id, :status_id, :priority_id, :time_type_id, :contact_id, :created_by

  # Callbacks
  before_update :set_closed_at

  # Scopes
  scope :ticket_includes, -> { includes(:group, :contact, :creator, :priority, :status, :time_type, :owner)}
  scope :with_related_records, -> { includes(:comments, :alerts) }
  scope :with_long_title, -> { where("LENGTH(title) > 20") }
  scope :not_closed, -> { joins(:status).where("statuses.name is not 'Closed'") }
  scope :recently_assigned_to, -> (user_id) { where(owned_by: user_id).order(updated_at: :desc).limit(5) }
  scope :active_tickets, -> { joins(:status).where("statuses.name = 'Re-opened' OR statuses.name = 'Open'").order(updated_at: :desc).limit(5) }
  scope :closed_tickets, -> { joins(:status).where("statuses.name is 'Closed'").order(created_at: :desc).limit(5) }

  def self.timeline_opened_tickets
    self.count(group: 'date(created_at)', having: ['date(tickets.created_at) >= ? and date(tickets.created_at) <= ?', (Time.zone.now.beginning_of_day - 30.days).to_date.to_s, (Time.zone.now.end_of_day - 1.day).to_date.to_s])
  end

  def self.timeline_closed_tickets
    self.count(group: 'date(closed_at)', having: ['date(closed_at) >= ? and date(closed_at) <= ?', (Time.zone.now.beginning_of_day - 30.days).to_date.to_s, (Time.zone.now.end_of_day - 1.day).to_date.to_s])
  end

  def closed?
    status.name == 'Closed'
  end

  def only_touched?
    self.changed.size == 1 and self.changed[0] == "updated_at"
  end

  protected

  def set_closed_at
    # update the closed_at timestamp if the ticket is being closed
    if closed?
      self.closed_at = DateTime.now if self.closed_at.nil?
    else
      self.closed_at = nil unless self.closed_at.nil?
    end
  end
end
