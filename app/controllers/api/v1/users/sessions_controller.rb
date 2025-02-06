class Api::V1::Users::SessionsController < DeviseTokenAuth::SessionsController
  private

  def render_create_success
    render json: {
      success: true,
      message: "Signed in successfully",
      data: resource_data(resource_json: @resource)
    }
  end

  def render_create_error_bad_credentials
    render json: { success: false, errors: [ "Invalid email or password" ] }, status: :unauthorized
  end
end
