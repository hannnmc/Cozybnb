import React, { useEffect, useRef, useState } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useHistory } from "react-router-dom";
import './ListingMap.css';


function ListingMap({ 
    listings, 
    highlightedListing,
    mapOptions = {}, 
    mapEventHandlers = {}, 
    markerEventHandlers = {}
}) {
    const center = {lat: 44, lng: -80}
    return (
        <GoogleMap zoom={13} center={center} mapContainerClassName='map-container'>
            <Marker position={center}/>
        </GoogleMap>
    );
  }
function ListingMapWrapper() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY
    });
    if (!isLoaded ) return <div>Loading...</div> 
    return <ListingMap />;
}
 
export default ListingMapWrapper;
    // const [map, setMap] = useState(null);
    // const mapRef = useRef(null);
    // const markers = useRef({});
    // const history = useHistory();
  
    // Create the map
    // useEffect(() => {
    //   if (!map) {
    //     setMap(new window.google.maps.Map(mapRef.current, {
    //       center: {
    //         lat: 37.773972,
    //         lng: -122.431297
    //       }, // San Francisco coordinates
    //       zoom: 13,
    //       clickableIcons: false,
    //       ...mapOptions,
    //     }));
    //   }
    // }, [mapRef, map, mapOptions]);
  
    // Add event handlers to map
    // useEffect(() => {
    //   if (map) {
    //     const listeners = Object.entries(mapEventHandlers).map(([event, handler]) => 
    //       window.google.maps.event.addListener(
    //         map, 
    //         event, 
    //         (...args) => handler(...args, map)
    //       )
    //     );
  
    //     return () => listeners.forEach(window.google.maps.event.removeListener);
    //   }
    // }, [map, mapEventHandlers]);
  
    // Update map markers whenever `listing` changes
    // Add markers for new listing
    // useEffect(() => {
    //   if (map) {
    //     listing.forEach((listing) => {
    //       if (markers.current[listing.id]) return;
    
    //       const marker = new window.google.maps.Marker({ 
    //         map, 
    //         position: new window.google.maps.LatLng(listing.lat, listing.lng), 
    //         label: { 
    //           text: `$${listing.price.toString()}`, 
    //           fontWeight: 'bold',
    //           color: 'black'
    //         }, 
    //         icon: {
    //           path: `
    //             M 1,0 
    //             L 2,0 
    //             A 1 1 0 0 1 3,1
    //             A 1 1 0 0 1 2,2
    //             L 1,2 
    //             A 1 1 0 0 1 0,1
    //             A 1 1 0 0 1 1,0
    //             z
    //           `,
    //           fillOpacity: 1,
    //           fillColor: 'white',
    //           strokeColor: 'black',
    //           strokeWeight: 1,
    //           scale: 15,
    //           labelOrigin: new window.google.maps.Point(1.5, 1),
    //           anchor: new window.google.maps.Point(1.5, 1)
    //         }, 
    //       });
  
    //       Object.entries(markerEventHandlers).forEach(([event, handler]) => {
    //         marker.addListener(event, () => handler(listing));
    //       });
    //       markers.current[listing.id] = marker;
    //     })
    
        // Remove markers for old listing
        // Object.entries(markers.current).forEach(([listingId, marker]) => {
        //   if (listing.some(listing => listing.id.toString() === listingId)) return;
          
        //   marker.setMap(null);
        //   delete markers.current[listingId];
        // })
//       }
//     }, [listing, history, map, markerEventHandlers]);
// }

// useEffect(() => {
//     Object.entries(markers.current).forEach(([listingId, marker]) => {
//       const label = marker.getLabel();
//       const icon = marker.getIcon();

//       if (parseInt(listingId) === highlightedListing) {
//         marker.setLabel({ ...label, color: 'white' });
//         marker.setIcon({ ...icon, fillColor: 'black' });
//       } else {
//         marker.setLabel({ ...label, color: 'black' });
//         marker.setIcon({ ...icon, fillColor: 'white' });
//       }
//     });
//   }, [markers, highlightedListing]);
//     return (
//         <div ref={mapRef} className="map">
//         Map
//         </div>
//     );
// }

// const ListingMapWrapper = (props) => {

//     const { isLoaded } = useLoadScript({
//         googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY
//     });
 
//     if (!isLoaded ) return <div>Loading...</div> 
//     return <MAP />;

//     return (
//         <Wrapper apiKey={process.env.AIzaSyBw2_pShdQslBf5kxkwNvbr_Mr1uEx44k4}>
//             <ListingMap {...props} />
//         </Wrapper>
//     );
// }


// export default ListingMapWrapper;



