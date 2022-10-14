import React from "react";
import ListItem from "./ListItem";

function ListingList({ listings, highlightedListing, setHighlightedListing }) {
  return (
    <div className="listings-list">
      <h1>Listings: </h1>
      {listings.map((listing) => (
        <ListItem
          key={listing.id}
          listing={listing}
          isHighlighted={highlightedListing === listing.id}
          setHighlightedListing={setHighlightedListing}
        />
      ))}
    </div>
  );
}

export default ListingList;
