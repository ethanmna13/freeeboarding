Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      mount_devise_token_auth_for "User", at: "auth", controllers: {
        sessions: "api/v1/users/sessions"
      }
      namespace :admin do
        resources :users, only: [ :index, :update, :destroy ]
        get "users/current", to: "users#current"
      end
    end
  end
end
