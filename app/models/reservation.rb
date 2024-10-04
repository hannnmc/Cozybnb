# == Schema Information
#
# Table name: reservations
#
#  id         :bigint           not null, primary key
#  listing_id :bigint           not null
#  user_id    :bigint           not null
#  guests     :integer          not null
#  start_date :datetime         not null
#  end_date   :datetime         not null
#  total      :float            not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Reservation < ApplicationRecord

    validates :listing_id, :user_id, :guests, :start_date, :end_date, :total, presence: true

    belongs_to :listing
    belongs_to :user

    

end
