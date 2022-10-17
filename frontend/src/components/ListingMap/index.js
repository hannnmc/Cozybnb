import React, { useEffect, useRef, useState } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import { useHistory } from "react-router-dom";
import './ListingMap.css';

function ListingMap({ 
  listings, 
  highlightedListing,
  mapOptions = {}, 
  mapEventHandlers = {}, 
  markerEventHandlers = {}
}) {
  const [map, setMap] = useState(null);
  const mapRef = useRef(null);
  const markers = useRef({});
  const history = useHistory();

  // Create the map
  useEffect(() => {
    if (!map) {
      setMap(new window.google.maps.Map(mapRef.current, {
        center: {
          lat: 40.78472823202327,
          lng: -73.92906983512931
        }, // San Francisco coordinates
        zoom: 11,
        mapId: "49aa6f67e21bd8eb",
        gestureHandling: "greedy",
        clickableIcons: false,
        ...mapOptions,
      }));
    }
  }, [mapRef, map, mapOptions]);

  // Add event handlers to map
  useEffect(() => {
    if (map) {
      const listeners = Object.entries(mapEventHandlers).map(([event, handler]) => 
        window.google.maps.event.addListener(
          map, 
          event, 
          (...args) => handler(...args, map)
        )
      );

      return () => listeners.forEach(window.google.maps.event.removeListener);
    }
  }, [map, mapEventHandlers]);

  // Update map markers whenever `listings` changes
  useEffect(() => {
    if (map) {
      // Add markers for new listings
      listings.forEach((listing) => {
        if (markers.current[listing.id]) return;
  
        const marker = new window.google.maps.Marker({ 
          map, 
          position: new window.google.maps.LatLng(listing.lat, listing.lng), 
          label: { 
            text: `$${listing.price.toString()}`, 
            fontWeight: 'bold',
            color: 'black'
          }, 
          icon: {
            path: `
              M 1,0 
              L 2,0 
              A 1 1 0 0 1 3,1
              A 1 1 0 0 1 2,2
              L 1,2 
              A 1 1 0 0 1 0,1
              A 1 1 0 0 1 1,0
              z
            `,
            fillOpacity: 1,
            fillColor: 'white',
            strokeColor: 'black',
            strokeWeight: 0,
            scale: 15,
            labelOrigin: new window.google.maps.Point(1.5, 1),
            anchor: new window.google.maps.Point(1.5, 1)
          }, 
        });

        Object.entries(markerEventHandlers).forEach(([event, handler]) => {
          marker.addListener(event, () => handler(listing));
        });
        markers.current[listing.id] = marker;
      })
  
      // Remove markers for old listings
      Object.entries(markers.current).forEach(([listingId, marker]) => {
        if (listings.some(listing => listing.id.toString() === listingId)) return;
        
        marker.setMap(null);
        delete markers.current[listingId];
      })
    }
  }, [listings, history, map, markerEventHandlers]);

  // Change the style for listing marker on hover
  useEffect(() => {
    Object.entries(markers.current).forEach(([listingId, marker]) => {
      const label = marker.getLabel();
      const icon = marker.getIcon();

      if (parseInt(listingId) === highlightedListing) {
        marker.setLabel({ ...label, color: 'white' });
        marker.setIcon({ ...icon, fillColor: 'rgb(34,34,34)' });
      } else {
        marker.setLabel({ ...label, color: 'black' });
        marker.setIcon({ ...icon, fillColor: 'white', strokeWeight: 0 });
      }
    });
  }, [markers, highlightedListing]);

  return (
    <div ref={mapRef} className="map">
      Map
    </div>
  );
}

function ListingMapWrapper(props) {
  console.log(process.env.REACT_APP_MAPS_API_KEY)
  return (
    <Wrapper apiKey={process.env.REACT_APP_MAPS_API_KEY}>
      <ListingMap {...props} />
    </Wrapper>
  );
}

export default ListingMapWrapper;