Rails.application.routes.draw do

  root to: 'home#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      devise_for :users, controllers: {
          sessions: 'api/v1/sessions',
      }
      resources :sessions, only: [:create, :destroy]
      resources :tickets
    end
  end




end
