import './Search.css';
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import React, { useState } from 'react';

const Search = ({setLatitude, setLongitude}) => {
    let regex = /\/listings\/[0-9]+/i;
    let regex2 = /\/profile/i;
    const [value, setValue] = useState(null);

    if (value) {
        geocodeByAddress(value.label)
       .then(results => getLatLng(results[0]))
       .then(({ lat, lng }) => {
            setLatitude(lat);
            setLongitude(lng);
        });
    }

    return (
        <div className='search-bar'
        style={regex2.test(window.location.pathname) || regex.test(window.location.pathname) ? {} : {display:'flex'} }
        >
            <GooglePlacesAutocomplete
            apiKey={process.env.REACT_APP_MAPS_API_KEY}
            selectProps={{
                value,
                onChange: setValue,
                placeholder: "Start your search...",
                noOptionsMessage: () => "e.g. New York City",
                openMenuOnClick: true,
                isClearable: true,
                escapeClearsValue: true,
                // onFocus: () => clear();
            }}
            />
            <div className='search-button'>
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" height="12px" width="12px" display="block" stroke="currentcolor" strokeWidth="5.33333" overflow="visible"><g fill="none"><path d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"></path></g></svg>
            </div>
        </div>
    );
}
 
export default Search;

