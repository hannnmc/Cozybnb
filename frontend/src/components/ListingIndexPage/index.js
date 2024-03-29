import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchListings } from "../../store/listings";
import ListingList from "./ListingList";
import ListingMap from "../ListingMap"
import FilterForm from "./FilterForm";
import './ListingList.css';
import { fetchReviews } from "../../store/reviews";
import { restoreSession } from "../../store/session";

function ListingIndexPage({lat, lng, setLat, setLng}) {
  const history = useHistory(); 
  const dispatch = useDispatch();
  let listings = useSelector(state => Object.values(state.listings));
  const [minGuests, setMinGuests] = useState(1);
  const [maxGuests, setMaxGuests] = useState(16);
  const [minPrice, setMinPrice] = useState(1);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [selectedListing, setSelectedListing] = useState(null);
  const [bounds, setBounds] = useState(null);
  const [listingsArray, setListingsArray ] = useState(listings);

  // useEffect(() => {
  //   if (minGuests && maxGuests && bounds) {
  //     dispatch(fetchListings({ minGuests, maxGuests, bounds }));
  //   }
  // }, [minGuests, maxGuests, bounds, dispatch]);

  let listingLength = Object.keys(listings).length
  useEffect(() => {
    dispatch(fetchListings())
    dispatch(fetchReviews())
  },[dispatch]);

  useEffect(() => {
    dispatch(restoreSession());
},[dispatch])

  useEffect(() => {
    setListingsArray(listings.filter(listing => 
      listing.price >= minPrice &&
       listing.price <= maxPrice 
       ))
       if (bounds) {
         const boundsArray = bounds.split(',');
         console.log(boundsArray)
         for(let i = 0; i< boundsArray.length; i++) {
          boundsArray[i] = parseFloat(boundsArray[i])
         };
         const latWindow = boundsArray[2] - boundsArray[0];
         const lngWindow = boundsArray[3] - boundsArray[1];
        setListingsArray(listings.filter(listing => 
          listing.price >= minPrice &&
          listing.price <= maxPrice 
          &&
          listing.lat > boundsArray[0] - latWindow/3 && 
          listing.lat < boundsArray[2] + latWindow/3 &&
          listing.lng > boundsArray[1] - lngWindow/3 && 
          listing.lng < boundsArray[3] + lngWindow/3
          ))
      }
  }, [minPrice, maxPrice, listingLength, bounds]);

  
  const mapEventHandlers = useMemo(() => ({
    idle: map => {
      const urlBounds = map.getBounds().toUrlValue();
      if (urlBounds.split(',')[0] !== 'NaN') {
        setBounds(urlBounds);
      }
    }
  }), [history]);

  if(listings.length === 0) return null;

  return (
    <div className="listing-index-page">
      <div className="list-index-map-container">
        <ListingMap
          lat={lat}
          lng={lng}
          listings={listingsArray}
          mapEventHandlers={mapEventHandlers}
          markerEventHandlers={{
            click: (listing) => {
              setSelectedListing(listing.id)
              history.push(`/listings/${listing.id}`
            )},
            mouseover: (listing) => setSelectedListing(listing.id),
            mouseout: () => setSelectedListing(null)
          }}
          selectedListing={selectedListing} 
        />
      </div>
      <div className="listing-list-container">
        <FilterForm
          minGuests={minGuests}
          maxGuests={maxGuests}
          setMinGuests={setMinGuests}
          setMaxGuests={setMaxGuests}
          minPrice={minPrice}
          maxPrice={maxPrice}
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
          listings={listingsArray}
        />
        <ListingList 
          listings={listingsArray} 
          selectedListing={selectedListing} 
          setSelectedListing={setSelectedListing} 
        />
      </div>
    </div>
  );
}

export default ListingIndexPage;
