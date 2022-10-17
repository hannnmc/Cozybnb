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
  
  return (
    <>
      <div className="listings-list">
        {listings.map((listing) => (
            <ListItem
              key={listing.id}
              listing={listing}
              isHighlighted={highlightedListing === listing.id}
              setHighlightedListing={setHighlightedListing}
            />
        ))}
      </div>
    </>
  );
}

export default ListingList;
