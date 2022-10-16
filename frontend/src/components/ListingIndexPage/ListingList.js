import React from "react";
import ListItem from "./ListItem";
import * as listingActions from "../../store/listings";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

function ListingList({ listings, highlightedListing, setHighlightedListing }) {

  const { fetchListings } = listingActions;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchListings())
  },[dispatch])
  
  // dispatch(fetchListings());
  return (
    <>
      <div className="listings-list">
        {listings.map((listing) => (
          <div className="listing-box">
            <ListItem
              key={listing.id}
              listing={listing}
              isHighlighted={highlightedListing === listing.id}
              setHighlightedListing={setHighlightedListing}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default ListingList;
