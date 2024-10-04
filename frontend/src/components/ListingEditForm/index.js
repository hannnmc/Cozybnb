import './ListingEditForm.css'
import React, { useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import * as listingActions from "../../store/listings";
import { useHistory } from 'react-router-dom';
import ListingMap from '../ListingMap'
import { useMemo } from 'react';


function ListingEditForm({listing, setShowListingEdit}) {

  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory(); 
  
  if (!sessionUser.id ) {

  };


  const [errors, setErrors] = useState([]);
  const [title, setTitle] = useState(listing.title);
  const [price, setPrice] = useState(listing.price);
  const [description, setDescription] = useState(listing.description);
  const [guests, setGuests] = useState(listing.guests);
  const [beds, setBeds] = useState(listing.beds);
  const [bedrooms, setBedrooms] = useState(listing.bedrooms);
  const [baths, setBaths] = useState(listing.baths);
  const [address, setAddress] = useState(listing.address);
  const [city, setCity] = useState(listing.city);
  const [state, setState] = useState(listing.state);
  const [wifi, setWifi] = useState(listing.wifi);
  const [parking, setParking] = useState(listing.parking);
  const [kitchen, setKitchen] = useState(listing.kitchen);
  const [dedicatedWorkspace, setDedicatedWorkspace] = useState(listing.dedicatedWorkspace);
  const [petsAllowed, setPetsAllowed] = useState(listing.petsAllowed);
  const [propType, setPropType] = useState(listing.propType);
  const [lat, setLat] = useState(listing.lat);
  const [lng, setLng] = useState(listing.lng);
  const [country, setCountry] = useState(listing.country);
  const [bounds, setBounds] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [photoUrl2, setPhotoUrl2] = useState(null);
  const [photoUrl3, setPhotoUrl3] = useState(null);
  const [photoUrl4, setPhotoUrl4] = useState(null);
  const [photoUrl5, setPhotoUrl5] = useState(null);
  const [files, setFiles] = useState(null);

  const listings = useSelector(state => state.listings);

  const handleFile = e => {
    const file = e.currentTarget.files[0];
    const file2 = e.currentTarget.files[1];
    const file3 = e.currentTarget.files[2];
    const file4 = e.currentTarget.files[3];
    const file5 = e.currentTarget.files[4];
    const currentFiles = e.currentTarget.files;
    const filesList = [];
    for (let i = 0; i < currentFiles.length; i++) {
      filesList.push(currentFiles[i]);
    }
    if (filesList.length > 0) setFiles(filesList);

    if (file) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        setPhotoUrl(fileReader.result);
      };
    } else setPhotoUrl(null);
    if (file2) {
      const fileReader2 = new FileReader();
      fileReader2.readAsDataURL(file2);
      fileReader2.onload = () => {
        setPhotoUrl2(fileReader2.result);
      };
    } else setPhotoUrl2(null);
    if (file3) {
      const fileReader3 = new FileReader();
      fileReader3.readAsDataURL(file3);
      fileReader3.onload = () => {
        setPhotoUrl3(fileReader3.result);
      };
    } else setPhotoUrl3(null);
    if (file4) {
      const fileReader4 = new FileReader();
      fileReader4.readAsDataURL(file4);
      fileReader4.onload = () => {
        setPhotoUrl4(fileReader4.result);
      };
    } else setPhotoUrl4(null);
    if (file5) {
      const fileReader5 = new FileReader();
      fileReader5.readAsDataURL(file5);
      fileReader5.onload = () => {
        setPhotoUrl5(fileReader5.result);
      };
    } else setPhotoUrl5(null);
  }


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
      petsAllowed
    };
    Object.keys(newListing).forEach((key) => {

      formData.append(`listing[${key}]`, newListing[key]);
    })

    if (files && files.length > 0) {
      if (files.length > 5) setFiles(files.slice(0,5))

      files.forEach((file) => {
        formData.append('listing[photos][]', file)
      })
    } 
    setErrors([]);
    setShowListingEdit(false);
    // debugger
    return dispatch(listingActions.updateListing(formData,listing.id))
    .then(history.push({ pathname: `/listings/${listing.id}`}))
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

  const preview = photoUrl ? <img src={photoUrl} alt="" /> : null;
  const preview2 = photoUrl2 ? <img src={photoUrl2} alt="" /> : null;
  const preview3 = photoUrl3 ? <img src={photoUrl3} alt="" /> : null;
  const preview4 = photoUrl4 ? <img src={photoUrl4} alt="" /> : null;
  const preview5 = photoUrl5 ? <img src={photoUrl5} alt="" /> : null;

  return (
    <>
      <div id='new-listing-modal' className="signup-modal">
        <div 
        onClick={() => setShowListingEdit(false)} className="login-x-button"><span className="material-symbols-outlined">close</span></div>
      <header className="signup-header">
        <div></div>
        <div className="finish-signup">Edit Listing</div>
        <div></div>
      </header>

      <div className="signup-div">
        <form className='listing-edit-form' onSubmit={handleSubmit}>

          <div className="input-div firstname-signup">
            <input
              maxLength="73"
              className="firstname-input"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <span className="fn-floating-label">Title</span>
          </div>
          <div className='listing-edit-top2'>
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
            <div className="input-div listing-edit-inputdiv">
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
              {/* <input
                className="guests-input"
                type="number"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                min="0"
                max="16"
                required
              /> */}
              <select className='guests-input'
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              required
              >
                <option value="" disabled hidden></option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
              </select>
              <span className="guests-floating-label">Guests</span>
            </div>

            <div className="input-div">
              {/* <input
                className="bedrooms-input"
                type="number"
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                min="0"
                max="8"
                required
              /> */}
              <select className='bedrooms-input'
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              required
              >
                <option value="" disabled hidden></option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
              </select>
              <span className="bedrooms-floating-label">Bedrooms</span>
            </div>

            <div className="input-div">
              {/* <input
                className="beds-input"
                type="number"
                value={beds}
                onChange={(e) => setBeds(e.target.value)}
                min="0"
                max="12"
                required
              /> */}
              <select className='beds-input'
              value={beds}
              onChange={(e) => setBeds(e.target.value)}
              required
              >
                <option value="" disabled hidden></option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
              <span className="beds-floating-label">Beds</span>
            </div>

            <div className="bathrooms-div">
              {/* <input
                className="bathrooms-input"
                type="number"
                value={baths}
                onChange={(e) => setBaths(e.target.value)}
                min="0"
                max="5"
                required
              /> */}
              <select className='bathrooms-input'
              value={baths}
              onChange={(e) => setBaths(e.target.value)}
              required
              >
                <option value="" disabled hidden></option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
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

            <div className='price-input-div'>
              <input 
                className='new-price-input'
                type="number" 
                value={price > 0 && price < 1001 ? price : NaN}
                onChange={(e) => setPrice(e.target.value)}
                min="0"
                max="1000"
                placeholder='Price'
                required/>
                <span className="price-floating-label">$</span>
                <span className="night-floating-label">per night</span>
            </div>
            <div className='coord-input-div'>
              <input 
              className='lat-input'
              min="-90"
              max="90"
              type="number" 
              value={lat.toFixed(8)}
              onChange={(e) => setLat(parseFloat(e.target.value))}
              placeholder="Latitude"
              step='any'
              disabled
              required/>
              <span className='lattext'>Lat</span>
              
              <input 
              className='lng-input'
              min="-180"
              max="180"
              type="number" 
              value={lng.toFixed(8)}
              onChange={(e) => setLng(parseFloat(e.target.value))}
              placeholder="Longitude"
              step='any'
              disabled
              required/>
              <span className='lngtext'>Lng</span>
            </div>
          </div>
          
          <div className='new-checkboxes'>
            <div className='wifi-checkbox'>
              <label htmlFor="wifi-checkbox">Wifi</label>
              <input 
              id='wifi-checkbox'
              type="checkbox" 
              onChange={()=>setWifi(!wifi)}
              checked={wifi ? true : false}
              />
              
            </div>
            <div className='parking-checkbox'>
              <label htmlFor="parking-checkbox">Parking</label>
              <input 
              id='parking-checkbox'
              type="checkbox" 
              onChange={()=>setParking(!parking)}
              checked={parking ? true : false}
              />
            </div>
            <div className='kitchen-checkbox'>
              <label htmlFor="kitchen-checkbox">Kitchen</label>
              <input 
              id='kitchen-checkbox'
              type="checkbox" 
              onChange={()=>setKitchen(!kitchen)}
              checked={kitchen ? true : false}
              />
            </div>
            <div className='workspace-checkbox'>
              <label htmlFor="workspace-checkbox">Dedicated workspace</label>
              <input 
              id='workspace-checkbox'
              type="checkbox" 
              onChange={()=>setDedicatedWorkspace(!dedicatedWorkspace)}
              checked={dedicatedWorkspace ? true : false}
              />
            </div>
            <div className='pets-checkbox'>
              <label htmlFor="pets-checkbox">Pets allowed</label>
              <input 
              id='pets-checkbox'
              type="checkbox" 
              onChange={()=>setPetsAllowed(!petsAllowed)}
              checked={petsAllowed ? true : false}
              />
            </div>
          </div>

          <ul className="error-message">
            {errors.map(error => {
                return <li key={error}>{error}</li> 
            })}
          </ul>

          <div className='new-listing-top'>
            <div className='listing-image-upload'>
              <input className='listing-image-input' type="file" onChange={handleFile} 
              accept="image/png, image/jpg, image/jpeg"
              multiple/>
              <div className='listing-preview'>
              {preview}
              <div className='preview-div'>
                {preview2}
                {preview3}
                {preview4}
                {preview5}
              </div>
              </div>
              
            </div>
            
            <div className='listing-minimap'>
            <div><i className="fa-solid fa-location-dot"></i></div>
            <ListingMap
                      // listings={[listing]}
                      setNewListingLat={setLat}
                      setNewListingLng={setLng}
                      mapEventHandlers={mapEventHandlers}
                      mapOptions={{ 
                      center: { lat, lng }, 
                      zoom: 13.75, 
                      mapId: "49aa6f67e21bd8eb"
                      }}
                  />
            </div>
          </div>
          <button id='new-listing-button' type="submit">Update</button>

        </form>

      </div>
      </div>
      
    </>
  );
}

export default ListingEditForm;