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

function ListingIndexPage() {
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
  // if (minPrice && maxPrice && bounds) {
  //   dispatch(fetchListings({ minPrice, maxPrice, bounds }));
  // }

  useEffect(() => {
    dispatch(fetchListings())
    dispatch(fetchReviews())
  },[]);

  useEffect(() => {
    dispatch(restoreSession());
},[])

  useEffect(() => {
    setListingsArray(listings.filter(listing => listing.price >= minPrice && listing.price <= maxPrice))
  }, [minPrice, maxPrice, Object.keys(listings).length, bounds]);

  // useEffect(() => {
  //   if (minGuests && maxGuests && bounds) {
  //     dispatch(fetchListings({ minGuests, maxGuests, bounds }));
  //   }
  // }, [minGuests, maxGuests, bounds, dispatch]);

  // const mapEventHandlers = useMemo(() => ({
  //   click: event => {
  //     const search = new URLSearchParams(event.latLng.toJSON()).toString();
  //     history.push({ pathname: '/listings/new', search });
  //   },
  //   idle: map => setBounds(map.getBounds().toUrlValue())
  // }), [history]);

  if(listings.length === 0) return null;

  return (
    <div className="listing-index-page">
      <div className="list-index-map-container">
        <ListingMap
          listings={listingsArray}
          // mapEventHandlers={mapEventHandlers}
          markerEventHandlers={{
            click: (listing) => setSelectedListing(listing.id),
            click: (listing) => history.push(`/listings/${listing.id}`),
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
