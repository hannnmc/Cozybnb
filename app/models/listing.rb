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

    has_many_attached :photo


end
