import React, { useState } from 'react';
import { Redirect, Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import ProfilePage from "./components/ProfilePage";
import ListingIndexPage from './components/ListingIndexPage';
import ListingShowPage from './components/ListingShowPage';
import { useSelector } from 'react-redux';



function App() {

  const user = useSelector(({session}) => session.user);
  const [lat, setLat] = useState(40.74363402543966);
  const [lng, setLng] = useState(-73.98377122848856);

  const loggedIn = !!user;

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showListingEdit, setShowListingEdit] = useState(false);

  return (
    <>
      <Navigation 
        showLoginModal={showLoginModal} 
        setShowLoginModal={setShowLoginModal}
        setLat={setLat}
        setLng={setLng}
      />
      <Switch>
        <Route exact path="/listings/:listingId">
          <ListingShowPage 
          showLoginModal={showLoginModal} 
          setShowLoginModal={setShowLoginModal} 
          showListingEdit={showListingEdit} 
          setShowListingEdit={setShowListingEdit}/>
        </Route>
        <Route exact path="/profile">
          {loggedIn ? <ProfilePage
            showListingEdit={showListingEdit} 
            setShowListingEdit={setShowListingEdit}
          /> : <Redirect to="/" />}
        </Route>
        <Route path="/">
          <ListingIndexPage 
          lat={lat}
          lng={lng}
          setLat={setLat}
          setLng={setLng}
          />
        </Route>
      </Switch>
    </>
  );
}

export default App;
