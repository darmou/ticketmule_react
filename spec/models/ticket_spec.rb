require 'rails_helper'

# Test suite for the Todo model
RSpec.describe Ticket, type: :model do
  # Association tests
  it { should belong_to(:group) }
  it { should belong_to(:status) }
  it { should belong_to(:priority) }
  it { should belong_to(:time_type) }
  # Validation tests
  # ensure columns title and created_by are present before saving
  it { should validate_presence_of(:title) }
  it { should validate_presence_of(:details) }
  it { should validate_presence_of(:created_by) }
end