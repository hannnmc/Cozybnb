# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  first_name      :string           not null
#  last_name       :string           not null
#  birth_date      :date             not null
#  phone_number    :string(10)
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  about           :string
#
class User < ApplicationRecord
  has_secure_password
  before_validation :ensure_session_token

  validates :email, 
    uniqueness: true, 
    length: { in: 3..255 }, 
    format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :phone_number,
    format: { with: /\A\d{10}\z/ },
    length: { maximum: 10 },
    allow_nil: true
  validates :session_token, presence: true, uniqueness: true
  validates :password, length: { in: 6..255 }, allow_nil: true
  validates :email, :first_name, :last_name, :birth_date, presence: true
  validate :validate_age

  has_one_attached :photo
  has_many :reservations, dependent: :destroy
  has_many :reviews, dependent: :destroy
  has_many :listings, dependent: :destroy

  def self.find_by_credentials(email, password)
    user = User.find_by(:email => email)
    user&.authenticate(password)
  end

  
  def reset_session_token!
    self.session_token = generate_unique_session_token
    self.save!
    self.session_token
  end

  private 

  def generate_unique_session_token
    loop do
      session_token = SecureRandom::urlsafe_base64(16)
      return session_token unless User.exists?(session_token: session_token)
    end
  end

  def ensure_session_token
    self.session_token ||= generate_unique_session_token
  end

  def validate_age
    if birth_date.present? && birth_date > 18.years.ago
        errors.add(:birth_date, "You must be 18 or older to use Cozybnb. Other people won't see your birthday.")
    end
  end

end

