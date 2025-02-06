class Api::V1::Admin::UsersController < ApplicationController
  before_action :set_user, only: [ :update, :destroy ]

  def index
    users = User.select(:id, :name, :role, :account_status)
    render json: users
  end

  def current
    if current_user
      render json: current_user.slice(:id, :name, :role, :account_status)
    else
      render json: { error: "Not logged in" }, status: :unauthorized
    end
  end

  def register
    @user = User.new(register_params)
  end

  def update
    if @user.update(user_params)
      render json: @user.slice(:id, :name, :role, :account_status)
    else
      render json: { error: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    if @user.destroy
      render json: { message: "User deleted successfully" }
    else
      render json: { error: "Failed to delete user" }, status: :unprocessable_entity
    end
  end

  private

  def set_user
    @user = User.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: "User not found" }, status: :not_found
  end

  def user_params
    params.require(:user).permit(:name, :role, :account_status)
  end

  def register_params
    params.require(:user).permit(:email, :name, :role, :account_status, :encrypted_password)
  end
end
