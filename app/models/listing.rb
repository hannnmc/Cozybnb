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
#  users_id            :bigint           not null
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#
class Listing < ApplicationRecord

    has_one_attached :photo

    belongs_to :users

    validates :guests, inclusion: {in: 1..16, message: "Number of guests must be between 1 to 16"}
    validates :title, :description, :lat, :lng, :price, :guests, 
    :bedrooms, :beds, :bedrooms, :beds, :baths, :address, :city, :state, :wifi, presence: true

    def self.in_bounds(bounds)
        lower_lat, lower_lng, upper_lat, upper_lng = bounds
        where(lat: lower_lat..upper_lat, lng: lower_lng..upper_lng)
    end

    validates :price, inclusion: { in: 10...5000, message: "must be between $10 and $5000" }


end
