import React from "react";
import ListItem from "./ListItem";

function ListingList({ listings, minPrice, maxPrice, bounds, selectedListing, setSelectedListing }) {


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
