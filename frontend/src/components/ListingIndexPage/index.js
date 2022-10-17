import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchListings } from "../../store/listings";
import ListingList from "./ListingList";
import ListingMap from "../ListingMap"
import FilterForm from "./FilterForm";

import './ListingList.css';

function ListingIndexPage() {
  const history = useHistory(); 
  const dispatch = useDispatch();
  const listings = useSelector(state => Object.values(state.listings));
  const [minGuests, setMinGuests] = useState(1);
  const [maxGuests, setMaxGuests] = useState(16);
  const [minPrice, setMinPrice] = useState(100);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [highlightedListing, setHighlightedListing] = useState(null);
  const [bounds, setBounds] = useState(null);

  useEffect(() => {
    if (minGuests && maxGuests && bounds) {
      dispatch(fetchListings({ minGuests, maxGuests, bounds }));
    }
  }, [minGuests, maxGuests, bounds, dispatch]);

  useEffect(() => {
    if (minPrice && maxPrice && bounds) {
      dispatch(fetchListings({ minPrice, maxPrice, bounds }));
    }
  }, [minPrice, maxPrice, bounds, dispatch]);

  const mapEventHandlers = useMemo(() => ({
    click: event => {
      const search = new URLSearchParams(event.latLng.toJSON()).toString();
      history.push({ pathname: '/listings/new', search });
    },
    idle: map => setBounds(map.getBounds().toUrlValue())
  }), [history]);

  return (
    <div className="listing-index-page">
      <div className="list-index-map-container">
        <ListingMap
          listings={listings}
          mapEventHandlers={mapEventHandlers}
          markerEventHandlers={{
            click: (listing) => setHighlightedListing(listing.id),
          }}
          highlightedListing={highlightedListing} 
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
          listings={listings}
        />
        <ListingList 
          listings={listings} 
          highlightedListing={highlightedListing} 
          setHighlightedListing={setHighlightedListing} 
        />
      </div>
  </div>
  );
}

export default ListingIndexPage;
