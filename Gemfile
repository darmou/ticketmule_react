source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '3.1.0'



# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
#gem "rails", "~> 7.0.7"
gem 'rails', '~> 7.1.0'

# Use sqlite3 as the database for Active Record
gem 'sqlite3', '~> 1.4'
gem 'pg', '~> 1.2'
gem "activerecord-session_store"
#gem 'simple_token_authentication'
# Use Puma as the app server
gem 'puma', '~> 5.6'
# Use SCSS for stylesheets
gem 'sass-rails', '>= 6'
gem "sprockets-rails"
gem "jsbundling-rails"

gem 'simple_token_authentication', '~> 1.0'

gem 'devise'
# See https://github.com/rails/execjs#readme for more supported runtimes
# gem 'mini_racer', platforms: :ruby

# Turbolinks makes navigating your web application faster. Read more: https://github.com/turbolinks/turbolinks
gem 'turbolinks', '~> 5'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'acts_as_reportable'
gem 'api-pagination'
gem 'pagy', '~> 3.8'
gem 'jbuilder', '~> 2.7'
gem 'rack-cors'
gem 'ruport'
gem 'prawn'
gem 'prawn-rails', '~> 1.4.2'
gem 'jsonapi-serializer'

# Hotwire's SPA-like page accelerator [https://turbo.hotwired.dev]
gem "turbo-rails"

# Hotwire's modest JavaScript framework [https://stimulus.hotwired.dev]
gem "stimulus-rails"

# Vite.js integration in Ruby web apps [https://vite-ruby.netlify.app/]
gem "vite_rails"

#gem 'protected_attributes'

gem 'file_validators', '~> 2.3.0'


gem 'figaro'

# Use Active Storage variant
gem 'image_processing', '~> 1.12'


# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', '>= 1.4.2', require: false

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  gem 'pry'
  gem 'rubocop-faker'
  gem 'pry-byebug'
  gem 'rspec-rails'
end

group :development do
  # Access an interactive console on exception pages or by calling 'console' anywhere in the code.
  gem 'listen', '~> 3.2'
  gem 'web-console', '>= 3.3.0'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  #gem 'spring-watcher-listen', '~> 2.0.0'
end

group :test do
  # Adds support for Capybara system testing and selenium driver
  gem 'capybara', '>= 2.15', '< 4.0'
  gem 'selenium-webdriver'
  # Easy installation and use of web drivers to run system tests with browsers
  gem 'database_cleaner'
  gem 'factory_bot_rails', '~> 4.0'
  gem 'faker'
  gem 'shoulda-matchers', '~> 3.1'
  gem 'webdrivers'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]

