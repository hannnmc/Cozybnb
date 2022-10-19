import './NewListingForm.css'
import React, { useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import * as listingActions from "../../store/listings";


function NewListingForm(props) {

  
  const dispatch = useDispatch();
  const { setNewListingForm, setLoginFormModal } = props;
  const sessionUser = useSelector(state => state.session.user);
  if (!sessionUser) {
    // setNewListingForm(false);
    // setLoginFormModal(open => true);  
  };
  
  const [errors, setErrors] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(100);
  const [description, setDescription] = useState("");
  const [guests, setGuests] = useState("");
  const [beds, setBeds] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [baths, setBaths] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [wifi, setWifi] = useState(false);
  const [parking, setParking] = useState(false);
  const [kitchen, setKitchen] = useState(false);
  const [dedicatedWorkspace, setDedicatedWorkspace] = useState(false);
  const [petsAllowed, setPetsAllowed] = useState(false);
  const [propType, setPropType] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [usersId, setUsersId] = useState("");
  const [country, setCountry] = useState("");
    

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(listingActions.createListing({
      title,
      description, 
      lat, 
      lng, 
      price,
      guests, 
      bedrooms,
      beds,
      baths,
      address,
      city,
      state,
      country,
      wifi,
      propType,
      parking,
      kitchen,
      dedicatedWorkspace,
      petsAllowed,
      usersId
    }))
      .catch(async (res) => {
      let data;
      try {
      data = await res.clone().json();
      } catch {
      data = await res.text(); 
      }
      if (data?.errors) setErrors(data.errors);
      else if (data) setErrors([data]);
      else setErrors([res.statusText]);
      });
  };

  return (
    <>
      <div className="signup-modal">
        <div 
        onClick={() => setNewListingForm(false)} className="login-x-button"><span class="material-symbols-outlined">close</span></div>
      <header className="signup-header">
        <div></div>
        <div className="finish-signup">Create a new listing</div>
        <div></div>
      </header>

      <div className="signup-div">
        <form onSubmit={handleSubmit}>
          <div className="input-div">
            <input
              className="firstname-input"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <span className="fn-floating-label">Title</span>
          </div>
          <div>
            <div className='new-dropdown'>
              <div className='proptype-input'>
                <select
                  value={propType}
                  onChange={(e) => setPropType(e.target.value)}
                  required>
                  <option selected='true' disabled='true' value="">Property type</option>
                  <option value="Entire home">Entire home</option>
                  <option value="Partial space">Partial space</option>
                  <option value="Tree house">Tree house</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Loft">Loft</option>
                </select>
              </div>
              <div className='city-input'>
                <select 
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required>
                  <option disabled='true' selected='true' value="">City</option>
                  <option value="Astoria">Astoria</option>
                  <option value="Bushwick">Bushwick</option>
                  <option value="Flushing">Flushing</option>
                  <option value="Fort Lee">Fort Lee</option>
                  <option value="Long Island City">Long Island City</option>
                  <option value="Los Angeles">Los Angeles</option>
                  <option value="New York City">New York City</option>
                  <option value="San Diego">San Diego</option>
                  <option value="San Francisco">San Francisco</option>
                  <option value="Seattle">Seattle</option>
                </select>
              </div>
              <div className='state-input'>
                <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                required>
                  <option selected='true' disabled='true' value="">State</option>
                  <option value="CA">CA</option>
                  <option value="CT">CT</option>
                  <option value="DE">DE</option>
                  <option value="FL">FL</option>
                  <option value="GA">GA</option>
                  <option value="NJ">NJ</option>
                  <option value="NY">NY</option>
                  <option value="RI">RI</option>
                  <option value="TX">TX</option>
                  <option value="WA">WA</option>
                </select>
              </div>
              <div className='country-input'>
                <select disabled='true'>
                  <option selected='true' value="United States">United States</option>
                </select>
              </div>
            </div>
            <div className="input-div">
              <input
              className="address-input"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                placeholder="Address"
              />

              <span className="address-floating-label">Address</span>
            </div>
          </div>
          
          {/* <div className="matchname-message">Make sure it matches the name on your government ID.</div> */}
          <div className="error-message">
          </div>

          <div className='listing-specs'>

            <div className="input-div">
              <input
                className="guests-input"
                type="number"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                required
              />
              <span className="guests-floating-label">Guests</span>
            </div>
            {/* <div className="birthdate-message">To sign up, you need to be at least 18. Your birthday won't be shared with other people who use Cozybnb. </div> */}
            <div className="input-div">
              <input
                className="bedrooms-input"
                type="number"
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                required
              />
              <span className="bedrooms-floating-label">Bedrooms</span>
            </div>

            <div className="input-div">
              <input
                className="beds-input"
                type="number"
                value={beds}
                onChange={(e) => setBeds(e.target.value)}
                required
              />
              <span className="beds-floating-label">Beds</span>
            </div>

            {/* <div className="email-message">We'll email you trip confirmations and receipts.</div> */}
            <div className="bathrooms-div">
              <input
              className="bathrooms-input"
                type="number"
                value={baths}
                onChange={(e) => setBaths(e.target.value)}
                required
              />
              <span className="bathrooms-floating-label">Bathrooms</span>
            </div>

          </div>
          {/* <div className="agree-message">By selecting 
          <span className="bold">  Agree and continue</span>, I agree to Cozybnb's 
          <span className="bold2">Term of Service</span>. 
          <a href="https://www.linkedin.com/in/hanchen28/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://github.com/hannnmc" target="_blank" rel="noopener noreferrer">Github</a>
           </div> */}
          <ul className="error-message">
            {errors.map(error => {
              if (error.includes('Birth date')) {
                return <li key={error}>{error.slice(11)}</li> 
              } else {
                return <li key={error}>{error}</li> 
              }
            })}
          </ul>
          <button id='new-listing-button' type="submit">Create</button>
        </form>
      </div>
      </div>
      
    </>
  );
}

export default NewListingForm;