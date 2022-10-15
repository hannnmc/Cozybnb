ApplicationRecord.transaction do 
    puts "Destroying tables..."

    User.destroy_all
    Listing.destroy_all

    puts "Resetting primary keys..."

    ApplicationRecord.connection.reset_pk_sequence!('users')
    ApplicationRecord.connection.reset_pk_sequence!('listings')
  
    puts "Creating users..."

    User.create!(
      email: 'hanmikechen@gmail.com', 
      password: 'password',
      first_name: 'Han',
      last_name: 'Chen',
      birth_date: '28/10/1991',
      photoUrl: "https://thecozybnb-dev.s3.amazonaws.com/frc47yk43z91x5ur81bfnraqf7hh"
    )
    User.create!(
      email: 'facebookUser@fb.com', 
      password: 'password',
      first_name: 'Facebook',
      last_name: 'User',
      birth_date: '01/01/1991'
    )
    User.create!(
      email: 'googleuser@gmail.com', 
      password: 'password',
      first_name: 'Google',
      last_name: 'User',
      birth_date: '01/01/1991'
    )
    User.create!(
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

    Listing.create!({
      title: 'Cozy & Sustainable Catskills Cabin',
      description: "The Black A-frame is a two bed two bath 1961 cabin set on a private road in the heart of the Catskills in Kerhonkson, NY. It was named the \"Coolest A-frame in NY\" by the New York Post in 2020. Relax in the open dinning room with original wood ceilings and beams and enjoy a home cooked meal made in the renovated chef's kitchen, or walk outdoors to soak in the magic of the Catskills through the endless wooded views from the back yard!",
      price: Faker::Number.within(range: 11..999),
      guests: Faker::Number.within(range:1..8),
      bedrooms: Faker::Number.within(range:1..4),
      beds: Faker::Number.within(range:1..6),
      baths: Faker::Number.within(range:1..3),
      address: '163 West Rd.',
      city: 'Kerhonkson',
      state: 'NY',
      wifi: true,
      parking: true,
      kitchen: true,
      dedicated_workspace: true,
      pets_allowed: true,
      users_id: 1,
      lat: 40.73370750852567,
      lng: -73.98195562597553
    })

    puts "Done!"
end