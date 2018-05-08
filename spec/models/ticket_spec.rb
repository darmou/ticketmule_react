require 'rails_helper'

# Test suite for the Todo model
RSpec.describe Ticket, type: :model do
  # Association tests
  it { should have_one(:group).dependent(:destroy) }
  it { should have_one(:status).dependent(:destroy) }
  it { should have_one(:priority).dependent(:destroy) }
  it { should have_one(:time_type).dependent(:destroy) }
  # Validation tests
  # ensure columns title and created_by are present before saving
  it { should validate_presence_of(:title) }
  it { should validate_presence_of(:details) }
  it { should validate_presence_of(:created_by) }
end