# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Group.create name: 'Group1'
Group.create name: 'Group2'
Group.create name: 'Group3'
Group.create name: 'Group4'


# Do not delete 'open' and 'closed' statuses...those are required

Status.create name: 'Open'
Status.create name: 'Closed'
Status.create name: 'Re-opened'
Status.create name: 'Pending'
Status.create name: 'Unresolved'

Priority.create name: 'Urgent'
Priority.create name: 'Standard'

TimeType.create name: 'Trivial'
TimeType.create name: 'Medium'
TimeType.create name: 'Major Project'

user_attrs = {
    username: 'admin',
    password: 'welcome',
    password_confirmation: 'welcome',
    email: 'admin@admin.com',
    email_confirmation: 'admin@admin.com',
    first_name: 'The',
    last_name: 'Admin',
    time_zone: 'Melbourne'
}
User.create(user_attrs)

# allow admin to have admin rights
admin = User.find(1)
admin.admin = true
admin.save

