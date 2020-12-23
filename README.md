# TicketMule

No frills, general use support ticket tracking. Easily document and communicate client relations within a support team.

## Note

This is a complete redesign of the origoal Ticketmule by Lee Smith (rails 2.3, <https://github.com/leesmith/ticket_mule>).

System is now feature complete, some tests still to be written.

Also once finished will include, Jest and rspec for unit testing and Cypress tests for integration.

## Features

* Clean interface that is compatible with modern web browsers
* Add comments and file attachments to tickets
* Subscribe to ticket updates via email (alerts)
* Automatically sends an email to the user assigned as owner of a ticket
* View recent ticket activity and timeline statistics from the dashboard
* Export ticket in PDF format
* No complicated permission system...only admins can perform negative actions
* In-line admin controls to delete comments, attachments, and tickets
* Ruby on Rails 6.0, ReactJS 16.13.1


## Included Gems

* api-pagination 4.0.2
* pagy 3.8
* faker 1.0.1
* devise 4.7.2
* byebug 11.0
* puma 4.3.6

Faker is only used to load fake data.

## Database support

TicketMule runs on PostgreSQL by default. MySQL and SQLite can be used with a small change to a couple of queries in the Ticket model.

## Install

Basic installation creates a fresh database with a single admin user. See +db+/+seeds+.+rb+ for admin user information.

After performing the basic setup, you can choose to test drive TicketMule by running the +faker+ rake task as described below.

Create a database.yml file and modify as needed:

```$ cp config/database.postgresql.yml config/database.yml```

Configure TicketMule settings in the production block of +config+/+config+.+yml+. See comments for details.

Modify +config+/+environment+.+rb+ settings such as default timezone, rails gem version, relative url root (if applicable), etc.

Modify +db+/+seeds+.+rb+ to create the seed data for your installation of TicketMule. This is where you create your organization's groups, statuses, and priorities.

Choose between basic installation or installation with test data:

Basic installation create database and schema, and initialize with seed data:

```$ rake db:setup```

Test drive initialize with seed data, and load 150 contacts, 500 tickets, and 4 non-admin users (see +lib+/+tasks+/+faker+.+rake+ for details):

```$ rake db:seed; rake db:populate```

## Notes

By default, users can create their own accounts by navigating to /users/new. If this is not desired and you only want admins to create user accounts, a small change to +config+/+routes+.+rb+ is required. The users resource will need the exception added for the new action. See the comments for the users resource map for details.

When you add an alert to a ticket, you will only receive an email alert when the ticket's attributes change. You will not receive an email alert when a comment or attachment is added.

## License

Copyright (c) 2009 by J. Lee Smith. All rights reserved. Redesign by Daryl Moulder for Rails 6.0 and ReactJS with other changes to Ticket properties and reporting (c) 2020

TicketMule is released under the MIT License. See the LICENSE file for details.

## Credits

Fugue icons copyright (c) 2010 by [Yusuke Kamiyamane](http://p.yusukekamiyamane.com/)

