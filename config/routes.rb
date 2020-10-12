Rails.application.routes.draw do

  root to: 'home#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      devise_for :users, controllers: {
          sessions: 'api/v1/sessions',
      }
      resources :sessions, only: [:create, :destroy]
      resources :groups, only: [:index]
      resources :time_types, only: [:index]
      resources :statuses, only: [:index]
      resources :tickets do
        resources :comments, only: [:create, :destroy]
      end

      resources :priorities, only: [:index]
    end
  end

  get '*all', to: 'home#index', constraints: lambda { |req|
    req.path.exclude? 'rails/active_storage'
  }


end
