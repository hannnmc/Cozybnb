# == Schema Information
#
# Table name: reviews
#
#  id         :bigint           not null, primary key
#  body       :text             not null
#  rating     :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :bigint           not null
#  listing_id :bigint           not null
#
class Review < ApplicationRecord


    belongs_to :user
    belongs_to :listing

    validates :body, :rating, :user_id, :listing_id, presence: true

end
