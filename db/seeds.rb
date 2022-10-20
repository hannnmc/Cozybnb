ApplicationRecord.transaction do 
    puts "Destroying tables..."

    User.destroy_all
    Listing.destroy_all

    puts "Resetting primary keys..."

    ApplicationRecord.connection.reset_pk_sequence!('users')
    ApplicationRecord.connection.reset_pk_sequence!('listings')
  
    puts "Creating users..."

    user1 = User.create!(
      email: 'hanmikechen@gmail.com', 
      password: 'password',
      first_name: 'Han',
      last_name: 'Chen',
      birth_date: '28/10/1991'
    )
    user2 = User.create!(
      email: 'facebookUser@fb.com', 
      password: 'password',
      first_name: 'Facebook',
      last_name: 'User',
      birth_date: '01/01/1991'
    )
    user3 = User.create!(
      email: 'googleuser@gmail.com', 
      password: 'password',
      first_name: 'Google',
      last_name: 'User',
      birth_date: '01/01/1991'
    )
    user4 = User.create!(
      email: 'appleuser@icloud.com', 
      password: 'password',
      first_name: 'Apple',
      last_name: 'User',
      birth_date: '01/01/1991'
    )

  
    10.times do 
      User.create!({
        email: Faker::Internet.unique.email,
        password: 'password',
        first_name: Faker::Name.first_name,
        last_name: Faker::Name.last_name,
        birth_date: Faker::Date.between(from: '2000-09-23', to: '2003-09-25')
      }) 
    end

    puts "Creating listings..."
    
    listing1 = Listing.create!({
      title: "Time Square Manhattan Luxury Loft",
      description: "Have fun with the whole family at this stylish place.  Two bedroom 2 bathroom,  fully stock kitchen, washer and dryer.  Walk to Time Square, Central Park and Madison Square Garden and many more.  The best shopping and dinning in the city.",
      price: Faker::Number.within(range: 300..600),
      guests: 4,
      bedrooms: 2,
      beds: 2,
      baths: 2,
      address: '5 Madison Ave.',
      city: 'Manhattan',
      state: 'NY',
      country: 'United States',
      wifi: true,
      parking: true,
      kitchen: true,
      dedicated_workspace: true,
      prop_type: 'Loft',
      pets_allowed: true,
      users_id: 1,
      lat: 40.76732546060237
      lng: -73.968918005597
    })

    listing2 = Listing.create!({
      title: '3 BD Manhattan High Life',
      description: "Living the life of luxury in Manhattan Penthouse, with the best views of the city.",
      price: Faker::Number.within(range: 500..800),
      guests: 6,
      bedrooms: 3,
      beds: 4,
      baths: 2,
      address: '1 Park Ave',
      city: 'Manhattan',
      state: 'NY',
      country: 'United States',
      wifi: true,
      parking: false,
      kitchen: true,
      dedicated_workspace: true,
      prop_type:'Entire home',
      pets_allowed: true,
      users_id: 1,
      lat: 40.773506142037114
      lng: -73.96588646726212
    })

    listing3 = Listing.create!({
      title: 'Moon View Yurt - Sleep Under the Moon and Stars!',
      description: "A simple yurt with a custom clear ceiling for a full view of the vast open skies. Gaze upon the stunning starry nights and fall asleep under the moonlight. Experience the peace and tranquility on top of a hill in the middle of an open field surrounded by wild flowers and nature's bounty in complete privacy.",
      price: Faker::Number.within(range: 100..600),
      guests: Faker::Number.within(range:1..8),
      bedrooms: Faker::Number.within(range:1..4),
      beds: Faker::Number.within(range:1..6),
      baths: Faker::Number.within(range:1..3),
      address: 'Central Plains Circle 8',
      city: 'Lagrangeville',
      state: 'New York',
      country: 'United States',
      wifi: true,
      parking: true,
      kitchen: false,
      dedicated_workspace: false,
      prop_type: 'Entire home',
      pets_allowed: true,
      users_id: 1,
      lat: 41.6450129,
      lng: -73.7742898
    })

    listing4 = Listing.create!({
      title: 'Cozy & Sustainable Catskills Cabin',
      description: "The Black A-frame is a two bed two bath 1961 cabin set on a private road in the heart of the Catskills in Kerhonkson, NY. It was named the \"Coolest A-frame in NY\" by the New York Post in 2020. Relax in the open dinning room with original wood ceilings and beams and enjoy a home cooked meal made in the renovated chef's kitchen, or walk outdoors to soak in the magic of the Catskills through the endless wooded views from the back yard!",
      price: Faker::Number.within(range: 100..600),
      guests: Faker::Number.within(range:1..8),
      bedrooms: Faker::Number.within(range:1..4),
      beds: Faker::Number.within(range:1..6),
      baths: Faker::Number.within(range:1..3),
      address: '100 South East Rd.',
      city: 'Kerhonkson',
      state: 'New York',
      country: 'United States',
      wifi: true,
      parking: true,
      kitchen: true,
      dedicated_workspace: true,
      prop_type: 'Entire home',
      pets_allowed: true,
      users_id: 1,
      lat: 41.7737011,
      lng: -74.3093264
    })

    listing5 =Listing.create!({
      title: 'Owl Bear Cabin at Stone Mountain Farm',
      description: "Owl Bear cabin is nestled in a forest glen on Stone Mountain Farm. Miles of hiking trails, flower filled fields, cliffs, ponds, streams and a mini Stone Henge are all a stones throw away. A diverse valley, one mile long and half a mile wide, there's plenty of privacy but lots of room for adventure- At any time you may discover a group of children building fairy houses, stumble upon a flying trapeze or Tai Chi Class class, or wander into the Rail Trail cafe for music under the trees.",
      price: Faker::Number.within(range: 100..600),
      guests: Faker::Number.within(range:1..8),
      bedrooms: Faker::Number.within(range:1..4),
      beds: Faker::Number.within(range:1..6),
      baths: Faker::Number.within(range:1..3),
      address: '99 Bombard St.',
      city: 'Hunter',
      state: 'New York',
      country: 'United States',
      wifi: true,
      parking: true,
      kitchen: true,
      dedicated_workspace: true,
      prop_type: 'Entire home',
      pets_allowed: true,
      users_id: 1,
      lat: 42.212258,
      lng: -74.2346391
    })

    listing6 = Listing.create!({
      title: 'Hudson Yards 2BR Luxury Views',
      description: "Georgeous apartment unit with modern styling.  Great views of the city and gets plenty of sunlight all year round.",
      price: 525,
      guests: 4,
      bedrooms: 2,
      beds: 2,
      baths: 2,
      address: '199 Hudson Blvd.',
      city: 'Manhattan',
      state: 'NY',
      country: 'United States',
      wifi: true,
      parking: false,
      kitchen: true,
      dedicated_workspace: true,
      prop_type: 'Entire home',
      pets_allowed: true,
      users_id: 10,
      lat: 40.7558606730357,
      lng: -74.00159449170306
    })

    listing7 = Listing.create!({
      title: 'Park Avenue Quintessential 4BD/4BATH',
      description: "The Triplex on Park is part of a historic landmark building that personifies Park Avenue's poise, elegance & spirit.

      Our story began in 2016 when our building, built in 1910, embarked on a complete renovation to further enrich our hosting experience in NY.",
      price: Faker::Number.within(range: 700..1000),
      guests: 8,
      bedrooms: 4,
      beds: 4,
      baths: 4,
      address: '5 Park Ave',
      city: 'Manhattan',
      state: 'NY',
      country: 'United States',
      wifi: true,
      parking: false,
      kitchen: true,
      dedicated_workspace: true,
      prop_type: 'Entire home',
      pets_allowed: true,
      users_id: 1,
      lat: 40.76646487964552, 
      lng: -73.96690756454522
    })

    listing8 = Listing.create!({
      title: 'Cozy & Sustainable Catskills Cabin',
      description: "The Black B-frame is a two bed two bath 1961 cabin set on a private road in the heart of the Catskills in Kerhonkson, NY. It was named the \"Coolest B-frame in NY\" by the New York Post in 2020. Relax in the open dinning room with original wood ceilings and beams and enjoy a home cooked meal made in the renovated chef's kitchen, or walk outdoors to soak in the magic of the Catskills through the endless wooded views from the back yard!",
      price: Faker::Number.within(range: 100..600),
      guests: Faker::Number.within(range:1..8),
      bedrooms: Faker::Number.within(range:1..4),
      beds: Faker::Number.within(range:1..6),
      baths: Faker::Number.within(range:1..3),
      address: '163 West Rd.',
      city: 'Kerhonkson',
      state: 'New York',
      country: 'United States',
      wifi: true,
      parking: true,
      kitchen: true,
      dedicated_workspace: true,
      prop_type: 'Entire home',
      pets_allowed: true,
      users_id: 1,
      lat: 41.7134011,
      lng: -74.3092264
    })

    listing9 = Listing.create!({
      title: 'Starlight Moonshine Roof Top',
      description: "King Room with Rooftop Views in Luxury Building",
      price: Faker::Number.within(range: 100..600),
      guests: Faker::Number.within(range:1..8),
      bedrooms: Faker::Number.within(range:1..4),
      beds: Faker::Number.within(range:1..6),
      baths: Faker::Number.within(range:1..3),
      address: '1 East Rd.',
      city: 'Manhattan',
      state: 'New York',
      country: 'United States',
      wifi: true,
      parking: false,
      kitchen: false,
      dedicated_workspace: true,
      prop_type: 'Entire home',
      pets_allowed: true,
      users_id: 1,
      lat: 40.7591212,
      lng: -74.0043361
    })

    listing10 = Listing.create!({
      title: 'Enchanted Tiny Tower nestled in the Berkshires',
      description: "Whimsical and romantic tower on the Santarella Estate in the heart of the Berkshires. Live out your own fairytale in this two-story unique, tiny home. First floor offers 3 rooms in one with kitchenette, sitting area, and dining room looking out on to the babbling brook. Upper bedchamber with canopied bed provides amazing views of sky and trees through massive, mill windows. Perfect destination for a relaxing getaway or special stay while exploring all the Berkshires has to offer.",
      price: Faker::Number.within(range: 100..600),
      guests: Faker::Number.within(range:1..8),
      bedrooms: Faker::Number.within(range:1..4),
      beds: Faker::Number.within(range:1..6),
      baths: Faker::Number.within(range:1..3),
      address: '1 Berkshires Rd.',
      city: 'Berkshires',
      state: 'New York',
      country: 'United States',
      wifi: false,
      parking: true,
      kitchen: true,
      dedicated_workspace: true,
      prop_type: 'Entire home',
      pets_allowed: true,
      users_id: 1,
      lat: 42.1981401,
      lng: -73.5000085
    })

    listing11 = Listing.create!({
      title: 'The Step by 128 Cabin Co.',
      description: "Reconnect with nature at this unforgettable escape. Located in the Hudson Valley, The Step is a little piece of paradise built on 78 acre's of operating farm land just stone through from the River. It is an off the grid 'glamping' experience equipped with the luxury of a queen size memory foam mattress for a good nights sleep. The Step is a secluded get away where you can explore our farm land, show off your scrabble skills, gaze at the stars, and be woken up by the sun through your windows.",
      price: Faker::Number.within(range: 100..600),
      guests: Faker::Number.within(range:1..8),
      bedrooms: Faker::Number.within(range:1..4),
      beds: Faker::Number.within(range:1..6),
      baths: Faker::Number.within(range:1..3),
      address: '2 Montgomery Rd.',
      city: 'Montgomery',
      state: 'New York',
      country: 'United States',
      wifi: false,
      parking: true,
      kitchen: true,
      dedicated_workspace: true,
      prop_type: 'Entire home',
      pets_allowed: true,
      users_id: 2,
      lat: 41.5209172,
      lng: -74.2457012
    })

    listing12 = Listing.create!({
      title: 'Architectural wonder in the forest',
      description: "Unique experience, secluded.
      Enjoy a weekend or a few days eco-friendly retreat in an architectural, geometric masterpiece on 30 preserved acres just minutes from all that Rhinebeck and the Hudson Valley have to offer.
      The house is an open plan, and though it has zero bedrooms, it can sleep 3!",
      price: Faker::Number.within(range: 100..600),
      guests: 4,
      bedrooms: 1,
      beds: 2,
      baths: 2,
      address: '3 Rhino Dr.',
      city: 'Rhinebeck',
      state: 'NY',
      country: 'United States',
      wifi: true,
      parking: true,
      kitchen: false,
      dedicated_workspace: true,
      prop_type: 'Entire home',
      pets_allowed: true,
      users_id: 16,
      lat: 41.924556784593946,
      lng: -73.90491596080538
    })

    puts "Attaching photos..."

    # user1 = User.first
    # listing1 = Listing.first

    user1.photo.purge
    listing1.photo.purge
    listing2.photo.purge
    listing3.photo.purge
    listing4.photo.purge
    listing5.photo.purge
    listing6.photo.purge
    listing7.photo.purge
    listing8.photo.purge
    listing9.photo.purge
    listing10.photo.purge

    user1_photo = URI.open("https://thecozybnb-dev.s3.amazonaws.com/profile_icon.jpg")
    user1.photo.attach(io: user1_photo, filename:"profile_icon.jpg")
    user1.save!

    # user1.photo.attach(
    #   io: URI.open("https://thecozybnb-dev.s3.amazonaws.com/profile_icon.jpg"),
    #   filename: "profile_icon.jpg"
    # )
    # user1.save!

    listing1_photo1 = URI.open("https://thecozybnb-dev.s3.amazonaws.com/listing1/photo1.jpg")
    listing1.photo.attach(io: listing1_photo1, filename:"photo1.jpg")
    listing1.save!

    listing2_photo1 = URI.open("https://thecozybnb-dev.s3.amazonaws.com/listing1/photo1.jpg")
    listing2.photo.attach(io: listing2_photo1, filename:"photo1.jpg")
    listing2.save!

    listing3_photo1 = URI.open("https://thecozybnb-dev.s3.amazonaws.com/listing1/photo1.jpg")
    listing3.photo.attach(io: listing3_photo1, filename:"photo1.jpg")
    listing3.save!

    listing4_photo1 = URI.open("https://thecozybnb-dev.s3.amazonaws.com/listing1/photo1.jpg")
    listing4.photo.attach(io: listing4_photo1, filename:"photo1.jpg")
    listing4.save!
    
    listing5_photo1 = URI.open("https://thecozybnb-dev.s3.amazonaws.com/listing1/photo1.jpg")
    listing5.photo.attach(io: listing5_photo1, filename:"photo1.jpg")
    listing6.save!

    listing6_photo1 = URI.open("https://thecozybnb-dev.s3.amazonaws.com/listing1/photo1.jpg")
    listing6.photo.attach(io: listing6_photo1, filename:"photo1.jpg")
    listing6.save!

    listing7_photo1 = URI.open("https://thecozybnb-dev.s3.amazonaws.com/listing1/photo1.jpg")
    listing7.photo.attach(io: listing7_photo1, filename:"photo1.jpg")
    listing7.save!

    listing8_photo1 = URI.open("https://thecozybnb-dev.s3.amazonaws.com/listing1/photo1.jpg")
    listing8.photo.attach(io: listing8_photo1, filename:"photo1.jpg")
    listing8.save!

    listing9_photo1 = URI.open("https://thecozybnb-dev.s3.amazonaws.com/listing1/photo1.jpg")
    listing9.photo.attach(io: listing9_photo1, filename:"photo1.jpg")
    listing9.save!
    
    listing10_photo1 = URI.open("https://thecozybnb-dev.s3.amazonaws.com/listing1/photo1.jpg")
    listing10.photo.attach(io: listing10_photo1, filename:"photo1.jpg")
    listing10.save!

    listing11_photo1 = URI.open("https://thecozybnb-dev.s3.amazonaws.com/listing1/photo1.jpg")
    listing11.photo.attach(io: listing11_photo1, filename:"photo1.jpg")
    listing11.save!

    listing12_photo1 = URI.open("https://thecozybnb-dev.s3.amazonaws.com/listing1/photo1.jpg")
    listing12.photo.attach(io: listing12_photo1, filename:"photo1.jpg")
    listing12.save!

    puts "Done!"
end

# user1.photo.attach(
#   io: URI.open("https://thecozybnb-dev.s3.amazonaws.com/profile_icon.jpg"),
#   filename: "profile_icon.jpg"
# )