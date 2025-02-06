# frozen_string_literal: true

class User < ActiveRecord::Base
  enum :role, { admin: 0, mentor: 1, mentee: 2 }
  enum :account_status, { inactive: 0, active: 1 }
  has_many :mentorships
  has_many :main_tasks
  has_many :sub_tasks
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  extend Devise::Models
  include DeviseTokenAuth::Concerns::User
end
