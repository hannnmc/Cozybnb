# == Schema Information
#
# Table name: listings
#
#  id                  :bigint           not null, primary key
#  title               :string           not null
#  description         :text             not null
#  lat                 :float            not null
#  lng                 :float            not null
#  price               :integer          not null
#  guests              :integer          not null
#  bedrooms            :integer          not null
#  beds                :integer          not null
#  baths               :integer          not null
#  address             :string           not null
#  city                :string           not null
#  state               :string           not null
#  wifi                :boolean          default(FALSE), not null
#  parking             :boolean          default(FALSE), not null
#  kitchen             :boolean          default(FALSE), not null
#  dedicated_workspace :boolean          default(FALSE), not null
#  pets_allowed        :boolean          default(TRUE), not null
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  country             :string           not null
#  prop_type           :string           default("Entire home"), not null
#  user_id             :bigint           not null
#
class Listing < ApplicationRecord

    has_many_attached :photos, dependent: :destroy
    has_many :reservations, dependent: :destroy
    has_many :reviews, dependent: :destroy

    belongs_to :user,
    class_name: "User"

    validates :guests, inclusion: {in: 1..16, message: "Number of guests must be between 1 to 16"}
    validates :price, inclusion: { in: 1..1000, message: "Price must be between $1 and $1000" }
    validates :bedrooms, inclusion: {in: 1..8, message: "Number of bedrooms must be between 1 to 8"}
    validates :beds, inclusion: {in: 1..12, message: "Number of beds must be between 1 to 12"}
    validates :baths, inclusion: {in: 1..5, message: "Number of bathrooms must be between 1 to 5"}
    validates :prop_type, inclusion: {in: ['Entire home', 'Partial space', 'Tree house', 'Apartment', 'Loft']}

    validates :title, :description, :lat, :lng, :price, :guests, :prop_type, :beds, :bedrooms, :beds, :baths, :address, :city, :state, :country, presence: true

    def self.in_bounds(bounds)
        lower_lat, lower_lng, upper_lat, upper_lng = bounds
        where(lat: lower_lat..upper_lat, lng: lower_lng..upper_lng)
    end




end
