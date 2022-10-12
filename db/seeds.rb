ApplicationRecord.transaction do 
    puts "Destroying tables..."

    User.destroy_all
  
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
  
    puts "Creating users..."
    # Create one user with an easy to remember username, email, and password:
    User.create!(
      username: 'DevHan', 
      email: 'hanmikechen@gmail.com', 
      password: 'password',
      first_name: 'Han',
      last_name: 'Chen',
      birth_date: '28/10/1991'
    )
    User.create!(
      username: 'FacebookUser', 
      email: 'facebookUser@fb.com', 
      password: 'password',
      first_name: 'Facebook',
      last_name: 'User',
      birth_date: '01/01/1991'
    )
    User.create!(
      username: 'GoogleUser', 
      email: 'googleuser@gmail.com', 
      password: 'password',
      first_name: 'Google',
      last_name: 'User',
      birth_date: '01/01/1991'
    )
    User.create!(
      username: 'AppleUser', 
      email: 'appleuser@icloud.com', 
      password: 'password',
      first_name: 'Apple',
      last_name: 'User',
      birth_date: '01/01/1991'
    )

  
    10.times do 
      User.create!({
        username: Faker::Internet.unique.username(specifier: 3),
        email: Faker::Internet.unique.email,
        password: 'password',
        first_name: Faker::Name.first_name,
        last_name: Faker::Name.last_name,
        birth_date: Faker::Date.between(from: '2000-09-23', to: '2003-09-25')
      }) 
    end

    puts "Done!"
end