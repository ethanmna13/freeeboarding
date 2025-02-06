class ApplicationController < ActionController::API
  class ApplicationController < ActionController::Base # Use ActionController::Base to enable sessions
    protect_from_forgery with: :exception

    before_action :authenticate_user!

    # Allow session storage for Devise
    def set_csrf_cookie
      cookies["CSRF-TOKEN"] = form_authenticity_token if protect_against_forgery?
    end

    protected

    def verified_request?
      super || request.headers["X-CSRF-Token"] == form_authenticity_token
    end
  end
end
