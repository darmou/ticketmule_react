Rails.application.routes.draw do

  root to: 'home#index'
  get '/rails/conductor/action_mailbox/inbound_emails/new', to: 'rails/conductor/action_mailbox/inbound_emails#new', as: 'new_rails_conductor_inbound_email'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      devise_for :users, controllers: {
          sessions: 'api/v1/sessions',
      }
      resources :options, only: [:index] do
        member do
          post :toggle_enable
        end
      end
      resources :sessions, only: [:create, :destroy]
      resources :groups, only: [:index, :create]
      resources :time_types, only: [:index, :create]
      resources :priorities, only: [:index, :create]
      resources :statuses, only: [:index, :create]
      resources :tickets do
        resources :comments, only: [:create, :destroy]
        resources :attachments, only: [:create, :destroy]
        resources :alerts, only: [:create, :destroy]
      end

      resources :users, only: [:index, :show, :update] do
        member do
          post :toggle_enable
        end
      end
      resources :contacts do
        member do
          post :toggle_enable
        end
      end
      resources :priorities, only: [:index]
    end
  end

  get '*all', to: 'home#index', constraints: lambda { |req|
    req.path.exclude? 'rails/active_storage' and
    req.path.exclude? 'rails/conductor' and
    req.path.exclude? 'rails/mailer'
  }


end
