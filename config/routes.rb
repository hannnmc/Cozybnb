Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  post 'api/test', to: 'application#test'

  # root "static_pages#root"

  namespace :api, defaults: { format: :json } do
    resources :users
    resources :listings
    resource :session, only: [:show, :create, :destroy ]
    resources :reservations
    resources :reviews
  end

  get '*path', to: "static_pages#frontend_index"
end
