# == Schema Information
#
# Table name: reviews
#
#  id          :bigint           not null, primary key
#  body        :text             not null
#  rating      :integer          not null
#  user_id    :bigint           not null
#  listings_id :bigint           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Review < ApplicationRecord


    belongs_to :users
    belongs_to :listings

end
