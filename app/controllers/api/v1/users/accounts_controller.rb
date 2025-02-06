class Api::V1::Users::AccountsController < ApplicationController
  def index
    @users = User.all
    render json:  @users
  end
end
