import React from "react";
import ListItem from "./ListItem";
import * as listingActions from "../../store/listings";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

function ListingList({ listings, minPrice, maxPrice, bounds, selectedListing, setSelectedListing }) {

  const { fetchListings } = listingActions;
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchListings())
  // },[dispatch, minPrice, maxPrice, bounds])

  return (
    <>
      <div className="listings-list">
        {listings.map((listing) => (
            <ListItem
              key={listing.id}
              listing={listing}
              isHighlighted={selectedListing === listing.id}
              setSelectedListing={setSelectedListing}
            />
        ))}
      </div>
    </>
  );
}

export default ListingList;
