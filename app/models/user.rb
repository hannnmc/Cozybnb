# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string           not null
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  first_name      :string           not null
#  last_name       :string           not null
#  birth_date      :date             not null
#  phone_number    :string(10)
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
  has_secure_password
  before_validation :ensure_session_token

  validates :username, 
    uniqueness: true, 
    length: { in: 3..30 }, 
    format: { without: URI::MailTo::EMAIL_REGEXP, message:  "can't be an email" }
  validates :email, 
    uniqueness: true, 
    length: { in: 3..255 }, 
    format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :phone_number,
    format: { with: /\A\d{8}\z/ },
    length: { maximum: 8 },
    allow_nil: true
  validates :session_token, presence: true, uniqueness: true
  validates :password, length: { in: 6..255 }, allow_nil: true
  validates :username, :email, :first_name, :last_name, :birth_date, presence: true
  validate :validate_age

  private 

  def generate_unique_session_token
    
  end

  def ensure_session_token

  end

  def validate_age
    if birth_date.present? && birth_date.to_i > 18.years.ago.to_i
        errors.add(:birth_date, "You must be 18 or older to use Cozybnb. Other people won't see your birthday.")
    end
  end

end

