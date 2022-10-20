require "open-uri"
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

  
    4.times do 
      User.create!({
        email: Faker::Internet.unique.email,
        password: 'password',
        first_name: Faker::Name.first_name,
        last_name: Faker::Name.last_name,
        birth_date: Faker::Date.between(from: '2000-09-23', to: '2003-09-25')
      }) 
    end

    puts "Creating listings..."
    
    listing1 = Listing.create({
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
      lat: 40.76732546060237,
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
      users_id: 5,
      lat: 40.773506142037114,
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
      users_id: 6,
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
      users_id: 6,
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
      users_id: 8,
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
      users_id: 5,
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
      users_id: 7,
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
      users_id: 7,
      lat: 41.7134011,
      lng: -74.3092264
    })

    listing9 = Listing.create!({
      title: 'Classic Townhouse on Millionaire\'s Row',
      description: "Bring the whole family to this huge 3 story private townhouse with lots of room for fun. Features a commercial grade Arcade, expansive dining room and bar.  Minutes from Central Park, The Metropolitan and Guggenheim Museums",
      price: Faker::Number.within(range: 600..1000),
      guests: 8,
      bedrooms: 3,
      beds: 4,
      baths: 2,
      address: '65 Miller St.',
      city: 'Manhattan',
      state: 'NY',
      country: 'United States',
      wifi: true,
      parking: false,
      kitchen: false,
      dedicated_workspace: true,
      prop_type: 'Entire home',
      pets_allowed: true,
      users_id: 6,
      lat: 40.79325173439996,
      lng: -73.97320465661757
    })

    listing10 = Listing.create!({
      title: 'Central Park Panoramic View - World Class Service',
      description: "This 2 bedroom, 2.5 bath luxury condo is perfect for high end travelers, short and long-term renters who are looking for accommodations in the Upper West Side, Midtown, Theater District, or Lincoln Center areas of Manhattan. The central location of our unit is perfect for exploring all that New York has to offer. The condo location is in Trump International Hotel & Tower and guest of ours will have full access to all the hotel's amenities.",
      price: Faker::Number.within(range: 850..1000),
      guests: 6,
      bedrooms: 2,
      beds: 3,
      baths: 3,
      address: '65 Miller St.',
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
      lat: 40.79325173439996,
      lng: -73.97320465661757
    })

    listing11 = Listing.create!({
      title: 'Spacious Penthouse With Great Skyline view',
      description: "Welcome to this Morden luxury Loft, The whole group will be comfortable in this spacious unique space. For small gatherings contact me so we can go over pricing",
      price: Faker::Number.within(range: 400..600),
      guests: 10,
      bedrooms: 2,
      beds: 2,
      baths: 2,
      address: '22 Belmont Rd.',
      city: 'East Orange',
      state: 'NJ',
      country: 'United States',
      wifi: true,
      parking: true,
      kitchen: true,
      dedicated_workspace: true,
      prop_type: 'Entire home',
      pets_allowed: true,
      users_id: 7,
      lat: 40.76308748165343,
      lng: -74.17333254874063
    })

    listing12 = Listing.create!({
      title: 'Architectural wonder in the forest',
      description: "Unique experience, secluded.
      Enjoy a weekend or a few days eco-friendly retreat in an architectural, geometric masterpiece on 30 preserved acres just minutes from all that Rhinebeck and the Hudson Valley have to offer.
      The house is an open plan, and though it has zero bedrooms, it can sleep 3!",
      price: Faker::Number.within(range: 300..500),
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
      users_id: 1,
      lat: 41.924556784593946,
      lng: -73.90491596080538
    })

    puts "Attaching photos..."

    # user1 = User.first
    # listing1 = Listing.first

    user1.photo.purge
    # listing1.photos.purge
    # listing2.photos.purge
    # listing3.photos.purge
    # listing4.photos.purge
    # listing5.photos.purge
    # listing6.photos.purge
    # listing7.photos.purge
    # listing8.photos.purge
    # listing9.photos.purge
    # listing10.photos.purge
    # listing11.photos.purge
    # listing12.photos.purge
    
    user1_photo = URI.open("https://thecozybnb-dev.s3.amazonaws.com/profile_icon.jpg")
    user1.photo.attach(io: user1_photo, filename:"profile_icon.jpg")


    l1p1 = URI.open("https://thecozybnb-seed.s3.amazonaws.com/listing1/photo1.jpg")
    l1p2 = URI.open("https://thecozybnb-seed.s3.amazonaws.com/listing1/photo2.webp")
    l1p3 = URI.open("https://thecozybnb-seed.s3.amazonaws.com/listing1/photo3.webp")
    l1p4 = URI.open("https://thecozybnb-seed.s3.amazonaws.com/listing1/photo4.webp")
    l1p5 = URI.open("https://thecozybnb-seed.s3.amazonaws.com/listing1/photo5.webp")

    listing1.photos.attach(
      [io: l1p1, filename:"photo1"],
      [io: l1p2, filename:"photo2"],
      [io: l1p3, filename:"photo3"],
      [io: l1p4, filename:"photo4"],
      [io: l1p5, filename:"photo5"]
    )

    l2p1 = URI.open("https://thecozybnb-seed.s3.amazonaws.com/listing2/photo1.jpg")
    l2p2 = URI.open("https://thecozybnb-seed.s3.amazonaws.com/listing2/photo2.webp")
    l2p3 = URI.open("https://thecozybnb-seed.s3.amazonaws.com/listing2/photo3.webp")
    l2p4 = URI.open("https://thecozybnb-seed.s3.amazonaws.com/listing2/photo4.webp")
    l2p5 = URI.open("https://thecozybnb-seed.s3.amazonaws.com/listing2/photo5.webp")

    listing2.photos.attach(
      [io: l2p1, filename:"photo1"],
      [io: l2p2, filename:"photo2"],
      [io: l2p3, filename:"photo3"],
      [io: l2p4, filename:"photo4"],
      [io: l2p5, filename:"photo5"]
    )
    l3p1 = URI.open("https://thecozybnb-seed.s3.amazonaws.com/listing3/photo1.jpg")
    l3p2 = URI.open("https://thecozybnb-seed.s3.amazonaws.com/listing3/photo2.webp")
    l3p3 = URI.open("https://thecozybnb-seed.s3.amazonaws.com/listing3/photo3.webp")
    l3p4 = URI.open("https://thecozybnb-seed.s3.amazonaws.com/listing3/photo4.webp")
    l3p5 = URI.open("https://thecozybnb-seed.s3.amazonaws.com/listing3/photo5.webp")

    listing3.photos.attach(
      [io: l3p1, filename:"photo1"],
      [io: l3p2, filename:"photo2"],
      [io: l3p3, filename:"photo3"],
      [io: l3p4, filename:"photo4"],
      [io: l3p5, filename:"photo5"]
    )
    l4p1 = URI.open("https://thecozybnb-seed.s3.amazonaws.com/listing4/photo1.jpg")
    l4p2 = URI.open("https://thecozybnb-seed.s3.amazonaws.com/listing4/photo2.webp")
    l4p3 = URI.open("https://thecozybnb-seed.s3.amazonaws.com/listing4/photo3.webp")
    l4p4 = URI.open("https://thecozybnb-seed.s3.amazonaws.com/listing4/photo4.webp")
    l4p5 = URI.open("https://thecozybnb-seed.s3.amazonaws.com/listing4/photo5.webp")

    listing4.photos.attach(
      [io: l4p1, filename:"photo1"],
      [io: l4p2, filename:"photo2"],
      [io: l4p3, filename:"photo3"],
      [io: l4p4, filename:"photo4"],
      [io: l4p5, filename:"photo5"]
    )
    l5p1 = URI.open("https://thecozybnb-seed.s3.amazonaws.com/listing5/photo1.jpg")
    l5p2 = URI.open("https://thecozybnb-seed.s3.amazonaws.com/listing5/photo2.webp")
    l5p3 = URI.open("https://thecozybnb-seed.s3.amazonaws.com/listing5/photo3.webp")
    l5p4 = URI.open("https://thecozybnb-seed.s3.amazonaws.com/listing5/photo4.webp")
    l5p5 = URI.open("https://thecozybnb-seed.s3.amazonaws.com/listing5/photo5.webp")

    listing5.photos.attach(
      [io: l5p1, filename:"photo1"],
      [io: l5p2, filename:"photo2"],
      [io: l5p3, filename:"photo3"],
      [io: l5p4, filename:"photo4"],
      [io: l5p5, filename:"photo5"]
    )
    l6p1 = URI.open("https://thecozybnb-seed.s3.amazonaws.com/listing6/photo1.jpg")
    l6p2 = URI.open("https://thecozybnb-seed.s3.amazonaws.com/listing6/photo2.webp")
    l6p3 = URI.open("https://thecozybnb-seed.s3.amazonaws.com/listing6/photo3.webp")
    l6p4 = URI.open("https://thecozybnb-seed.s3.amazonaws.com/listing6/photo4.webp")
    l6p5 = URI.open("https://thecozybnb-seed.s3.amazonaws.com/listing6/photo5.webp")

    listing6.photos.attach(
      [io: l6p1, filename:"photo1"],
      [io: l6p2, filename:"photo2"],
      [io: l6p3, filename:"photo3"],
      [io: l6p4, filename:"photo4"],
      [io: l6p5, filename:"photo5"]
    )
    l7p1 = URI.open("https://thecozybnb-seed.s3.amazonaws.com/listing7/photo1.jpg")
    l7p2 = URI.open("https://thecozybnb-seed.s3.amazonaws.com/listing7/photo2.webp")
    l7p3 = URI.open("https://thecozybnb-seed.s3.amazonaws.com/listing7/photo3.webp")
    l7p4 = URI.open("https://thecozybnb-seed.s3.amazonaws.com/listing7/photo4.webp")
    l7p5 = URI.open("https://thecozybnb-seed.s3.amazonaws.com/listing7/photo5.webp")

    listing7.photos.attach(
      [io: l7p1, filename:"photo1"],
      [io: l7p2, filename:"photo2"],
      [io: l7p3, filename:"photo3"],
      [io: l7p4, filename:"photo4"],
      [io: l7p5, filename:"photo5"]
    )
    l8p1 = URI.open("https://thecozybnb-seed.s3.amazonaws.com/listing8/photo1.jpg")
    l8p2 = URI.open("https://thecozybnb-seed.s3.amazonaws.com/listing8/photo2.webp")
    l8p3 = URI.open("https://thecozybnb-seed.s3.amazonaws.com/listing8/photo3.webp")
    l8p4 = URI.open("https://thecozybnb-seed.s3.amazonaws.com/listing8/photo4.webp")
    l8p5 = URI.open("https://thecozybnb-seed.s3.amazonaws.com/listing8/photo5.webp")

    listing8.photos.attach(
      [io: l8p1, filename:"photo1"],
      [io: l8p2, filename:"photo2"],
      [io: l8p3, filename:"photo3"],
      [io: l8p4, filename:"photo4"],
      [io: l8p5, filename:"photo5"]
    )
    l9p1 = URI.open("https://thecozybnb-seed.s3.amazonaws.com/listing9/photo1.jpg")
    l9p2 = URI.open("https://thecozybnb-seed.s3.amazonaws.com/listing9/photo2.webp")
    l9p3 = URI.open("https://thecozybnb-seed.s3.amazonaws.com/listing9/photo3.webp")
    l9p4 = URI.open("https://thecozybnb-seed.s3.amazonaws.com/listing9/photo4.webp")
    l9p5 = URI.open("https://thecozybnb-seed.s3.amazonaws.com/listing9/photo5.webp")

    listing9.photos.attach(
      [io: l9p1, filename:"photo1"],
      [io: l9p2, filename:"photo2"],
      [io: l9p3, filename:"photo3"],
      [io: l9p4, filename:"photo4"],
      [io: l9p5, filename:"photo5"]
    )
    l10p1 = URI.open("https://thecozybnb-seed.s3.amazonaws.com/listing10/photo1.jpg")
    l10p2 = URI.open("https://thecozybnb-seed.s3.amazonaws.com/listing10/photo2.webp")
    l10p3 = URI.open("https://thecozybnb-seed.s3.amazonaws.com/listing10/photo3.webp")
    l10p4 = URI.open("https://thecozybnb-seed.s3.amazonaws.com/listing10/photo4.webp")
    l10p5 = URI.open("https://thecozybnb-seed.s3.amazonaws.com/listing10/photo5.webp")

    listing10.photos.attach(
      [io: l10p1, filename:"photo1"],
      [io: l10p2, filename:"photo2"],
      [io: l10p3, filename:"photo3"],
      [io: l10p4, filename:"photo4"],
      [io: l10p5, filename:"photo5"]
    )
    l11p1 = URI.open("https://thecozybnb-seed.s3.amazonaws.com/listing11/photo1.jpg")
    l11p2 = URI.open("https://thecozybnb-seed.s3.amazonaws.com/listing11/photo2.webp")
    l11p3 = URI.open("https://thecozybnb-seed.s3.amazonaws.com/listing11/photo3.webp")
    l11p4 = URI.open("https://thecozybnb-seed.s3.amazonaws.com/listing11/photo4.webp")
    l11p5 = URI.open("https://thecozybnb-seed.s3.amazonaws.com/listing11/photo5.webp")

    listing11.photos.attach(
      [io: l11p1, filename:"photo1"],
      [io: l11p2, filename:"photo2"],
      [io: l11p3, filename:"photo3"],
      [io: l11p4, filename:"photo4"],
      [io: l11p5, filename:"photo5"]
    )
    l12p1 = URI.open("https://thecozybnb-seed.s3.amazonaws.com/listing12/photo1.jpg")
    l12p2 = URI.open("https://thecozybnb-seed.s3.amazonaws.com/listing12/photo2.webp")
    l12p3 = URI.open("https://thecozybnb-seed.s3.amazonaws.com/listing12/photo3.webp")
    l12p4 = URI.open("https://thecozybnb-seed.s3.amazonaws.com/listing12/photo4.webp")
    l12p5 = URI.open("https://thecozybnb-seed.s3.amazonaws.com/listing12/photo5.webp")

    listing12.photos.attach(
      [io: l12p1, filename:"photo1"],
      [io: l12p2, filename:"photo2"],
      [io: l12p3, filename:"photo3"],
      [io: l12p4, filename:"photo4"],
      [io: l12p5, filename:"photo5"]
    )
    # listing1.photos.attach(io: l1p1, filename:"photo1.jpg")
    
    # listing1.photos.attach(io: l1p2, filename:"photo2.webp")
    
    # listing1.photos.attach(io: l1p3, filename:"photo3.webp")
    
    # listing1.photos.attach(io: l1p4, filename:"photo4.webp")
    
    # listing1.photos.attach(io: l1p5, filename:"photo5.webp")
    
    listing1.save
    puts "Done!"
  end

# user1.photo.attach(
#   io: URI.open("https://thecozybnb-dev.s3.amazonaws.com/profile_icon.jpg"),
#   filename: "profile_icon.jpg"
# )