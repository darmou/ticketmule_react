NUM_CONTACTS = 150
NUM_TICKETS = 500

#Note populate is a separate rake task to be only used in testing
namespace :db do
  desc "Load fake data for development/testing."
  task :populate => :environment do
    require 'faker'

    desc "Create some fake users"
    attrs = { :username => 'sadams',
              :password => 'welcome',
              :password_confirmation => 'welcome',
              :email => 'sadams@mycompany.com',
              :email_confirmation => 'sadams@mycompany.com',
              :first_name => 'Sam',
              :last_name => 'Adams',
              :time_zone => 'Central Time (US & Canada)',
              :admin => false }
    User.create(attrs)
    attrs = { :username => 'jdaniels',
              :password => 'welcome',
              :password_confirmation => 'welcome',
              :email => 'jdaniels@mycompany.com',
              :email_confirmation => 'jdaniels@mycompany.com',
              :first_name => 'Jack',
              :last_name => 'Daniels',
              :time_zone => 'Eastern Time (US & Canada)',
              :admin => false }
    User.create(attrs)
    attrs = { :username => 'jbeam',
              :password => 'welcome',
              :password_confirmation => 'welcome',
              :email => 'jbeam@mycompany.com',
              :email_confirmation => 'jbeam@mycompany.com',
              :first_name => 'Jim',
              :last_name => 'Beam',
              :time_zone => 'Pacific Time (US & Canada)',
              :admin => false }
    User.create(attrs)
    attrs = { :username => 'jcuervo',
              :password => 'welcome',
              :password_confirmation => 'welcome',
              :email => 'jcuervo@mycompany.com',
              :email_confirmation => 'jcuervo@mycompany.com',
              :first_name => 'Jose',
              :last_name => 'Cuervo',
              :time_zone => 'Mountain Time (US & Canada)',
              :admin => false }
    User.create(attrs)
    attrs = { :username => 'jwalker',
              :password => 'welcome',
              :password_confirmation => 'welcome',
              :email => 'jwalker@mycompany.com',
              :email_confirmation => 'jwalker@mycompany.com',
              :first_name => 'Johnnie',
              :last_name => 'Walker',
              :time_zone => 'Central Time (US & Canada)',
              :admin => false }
    User.create(attrs)
    attrs = { :username => 'ewilliams',
              :password => 'welcome',
              :password_confirmation => 'welcome',
              :email => 'ewilliams@mycompany.com',
              :email_confirmation => 'ewilliams@mycompany.com',
              :first_name => 'Evan',
              :last_name => 'Williams',
              :time_zone => 'Pacific Time (US & Canada)',
              :admin => false }
    User.create(attrs)


    desc "Create some fake contacts"
    NUM_CONTACTS.times do
      Contact.create do | contact|
        contact.first_name = Faker::Name.first_name
        contact.last_name = Faker::Name.last_name
        contact.email = Faker::Internet.email
        contact.mobile_phone = Faker::PhoneNumber.phone_number
        contact.office_phone = Faker::PhoneNumber.phone_number
        contact.affiliation = Faker::Company.name
        contact.notes = Faker::Lorem.paragraph(sentence_count: sentence_count=5)
      end
    end

    desc "Create some fake tickets"
    NUM_TICKETS.times do
      Ticket.create do | ticket |
        ticket.title = Faker::Lorem.sentence(word_count: word_count=15)
        ticket.details = Faker::Lorem.paragraphs(number: paragraph_count=3)
        ticket.group_id = rand(4)+1 # random group_id [1..5]
        ticket.status_id = 1
        ticket.time_type_id = rand(3) + 1 # random time_type_id [1..3]
        ticket.priority_id = rand(3)+1 # random priority_id [1..3]
        ticket.contact_id = rand(NUM_CONTACTS)+1 # random contact_id [1..NUM_CONTACTS]
        ticket.created_by = rand(6)+2 # random created_by [2..7]
        ticket.owned_by = 1
      end
    end
  end
end