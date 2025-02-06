class ApplicationController < ActionController::API
  include Devise::Controllers::Helpers

  def current_user
    @current_user ||= warden.authenticate(scope: :user)
  end
end
