import './NewListingForm.css'
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import * as listingActions from "../../store/listings";
import { useHistory } from 'react-router-dom';
// import NewListingMap from './NewListingMap';
import { Wrapper } from '@googlemaps/react-wrapper';
import ListingMap from '../ListingMap'
import { useMemo } from 'react';


function NewListingForm(props) {
  
  const dispatch = useDispatch();
  const { setNewListingModal } = props;
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory(); 
  if (!sessionUser) {
    // setNewListingForm(false);
    // setLoginFormModal(open => true);  
  };
  const [photoFile, setPhotoFile] = useState (null);
  const [errors, setErrors] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState('');
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
  const [lat, setLat] = useState(40.7128);
  const [lng, setLng] = useState(-74.0060);
  const [usersId, setUsersId] = useState(sessionUser.id);
  const [country, setCountry] = useState("United States");
  const [bounds, setBounds] = useState(null);
  
  const listings = useSelector(state => state.listings)
  const newId = Object.keys(listings).length + 1

  const handleFile = e => {
    const file = e.currentTarget.files[0];
    setPhotoFile(file);
  }

  // useEffect(() => {
  //   console.log(lat,lng)
  // },[lat, lng])

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    const newListing = {
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
    };
    Object.keys(newListing).forEach((key) => {
      formData.append(`listing[${key}]`, newListing[key]);
    })
    if (photoFile) {
      formData.append('listing[photos]', photoFile);
    }
    console.log(formData);
    debugger

    setErrors([]);
    setNewListingModal(false);
    return dispatch(listingActions.createListing(formData
    //   {
    //   title,
    //   description, 
    //   lat, 
    //   lng, 
    //   price,
    //   guests, 
    //   bedrooms,
    //   beds,
    //   baths,
    //   address,
    //   city,
    //   state,
    //   country,
    //   wifi,
    //   propType,
    //   parking,
    //   kitchen,
    //   dedicatedWorkspace,
    //   petsAllowed,
    //   usersId
    // }
    ))
      .then(history.push({ pathname: `/listings/${newId}`}))
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

  const mapEventHandlers = useMemo(() => ({
    // click: event => {
    //   const search = new URLSearchParams(event.latLng.toJSON()).toString();
    //   console.log(event.latLng.toJSON())
    // },
    idle: map => setBounds(map.getBounds().toUrlValue())
  }), [history]);


  if(listings.length === 0) return null;

  // console.log(photoFile)

  return (
    <>
      <div id='new-listing-modal' className="signup-modal">
        <div 
        onClick={() => setNewListingModal(false)} className="login-x-button"><span className="material-symbols-outlined">close</span></div>
      <header className="signup-header">
        <div></div>
        <div className="finish-signup">Create a new listing</div>
        <div></div>
      </header>

      <div className="signup-div">
        <form onSubmit={handleSubmit}>

          <div className="input-div">
            <input
              maxLength="73"
              className="firstname-input"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <span className="fn-floating-label new-listing-title">Title</span>
          </div>
          <div>
            <div className='new-dropdown'>
              <div className='proptype-input'>
                <select
                  value={propType}
                  onChange={(e) => setPropType(e.target.value)}
                  required>
                  <option disabled value="">Property type</option>
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
                  <option disabled value="">City</option>
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
                  <option disabled value="">State</option>
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
                <select disabled defaultValue={country}>
                  <option value="United States">United States</option>
                </select>
              </div>
            </div>
            <div className="input-div">
              <input
              className="address-input"
                maxLength="50"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                placeholder="Address"
              />

              <span className="address-floating-label">Address</span>
            </div>
          </div>
          
          <div className="error-message">
          </div>

          <div className='listing-specs'>

            <div className="input-div">
              <input
                className="guests-input"
                type="number"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                min="0"
                max="16"
                required
              />
              <span className="guests-floating-label">Guests</span>
            </div>

            <div className="input-div">
              <input
                className="bedrooms-input"
                type="number"
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                min="0"
                max="8"
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
                min="0"
                max="12"
                required
              />
              <span className="beds-floating-label">Beds</span>
            </div>

            <div className="bathrooms-div">
              <input
                className="bathrooms-input"
                type="number"
                value={baths}
                onChange={(e) => setBaths(e.target.value)}
                min="0"
                max="5"
                required
              />
              <span className="bathrooms-floating-label">Bathrooms</span>
            </div>
          </div>

          <div className='new-listing-description'>
            <textarea 
            maxLength="1000"
            className='new-description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Tell us about your home'
            required />

          </div>

          
          <div className='coord-price'>
            <div className='coord-input-div'>
              <input 
              className='lat-input'
              min="-90"
              max="90"
              type="number" 
              value={lat}
              onChange={(e) => setLat(parseFloat(e.target.value))}
              placeholder="Latitude"
              step='any'
              required/>
              <input 
              className='lng-input'
              min="-180"
              max="180"
              type="number" 
              value={lng}
              onChange={(e) => setLng(parseFloat(e.target.value))}
              placeholder="Longitude"
              step='any'
              required/>
            </div>
            <div className='price-input-div'>
              <input 
                className='new-price-input'
                type="number" 
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                min="0"
                max="1000"
                placeholder='Price'
                required/>
                <span className="price-floating-label">$</span>
                <span className="night-floating-label">per night</span>
            </div>
          </div>
          
          <div className='new-checkboxes'>
            <div className='wifi-checkbox'>
              <label htmlFor="wifi-checkbox">Wifi</label>
              <input 
              id='wifi-checkbox'
              type="checkbox" 
              onChange={()=>setWifi(!wifi)}/>
            </div>
            <div className='parking-checkbox'>
              <label htmlFor="parking-checkbox">Parking</label>
              <input 
              id='parking-checkbox'
              type="checkbox" 
              onChange={()=>setParking(!parking)}/>
            </div>
            <div className='kitchen-checkbox'>
              <label htmlFor="kitchen-checkbox">Kitchen</label>
              <input 
              id='kitchen-checkbox'
              type="checkbox" 
              onChange={()=>setKitchen(!kitchen)}/>
            </div>
            <div className='workspace-checkbox'>
              <label htmlFor="workspace-checkbox">Dedicated workspace</label>
              <input 
              id='workspace-checkbox'
              type="checkbox" 
              onChange={()=>setDedicatedWorkspace(!dedicatedWorkspace)}/>
            </div>
            <div className='pets-checkbox'>
              <label htmlFor="pets-checkbox">Pets allowed</label>
              <input 
              id='pets-checkbox'
              type="checkbox" 
              onChange={()=>setPetsAllowed(!petsAllowed)}/>
            </div>
          </div>

          <ul className="error-message">
            {errors.map(error => {
                return <li key={error}>{error}</li> 
            })}
          </ul>
          {/* <div className="agree-message">By selecting 
          <span className="bold">  Continue</span>, I agree to Cozybnb's 
          <span className="bold2">Term of Service</span>. 
          <a href="https://www.linkedin.com/in/hanchen28/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://github.com/hannnmc" target="_blank" rel="noopener noreferrer">Github</a>
           </div> */}
          <div className='new-listing-top'>
            <div className='listing-image-upload'>
              <input type="file" onChange={handleFile} />
            </div>

            <div className='listing-minimap'>

            <ListingMap
                      // listings={[listing]}
                      setLat={setLat}
                      setLng={setLng}
                      mapEventHandlers={mapEventHandlers}
                      mapOptions={{ 
                      center: { lat, lng }, 
                      zoom: 13.75, 
                      mapId: "49aa6f67e21bd8eb"
                      }}
                  />
            </div>
          </div>
          <button id='new-listing-button' type="submit">Create</button>

        </form>

      </div>
      </div>
      
    </>
  );
}

export default NewListingForm;