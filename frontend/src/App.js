import React, { useState } from 'react';
import { Redirect, Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import ProfilePage from "./components/ProfilePage";
import ListingIndexPage from './components/ListingIndexPage';
import ListingShowPage from './components/ListingShowPage';
import { useSelector } from 'react-redux';



function App() {

  const user = useSelector(({session}) => session.user);

  const loggedIn = !!user;

  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <>
      <Navigation showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal}/>
        <Switch>
          <Route exact path="/listings/:listingId">
            <ListingShowPage showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal}/>
          </Route>
          <Route exact path="/profile">
            {loggedIn ? <ProfilePage/> : <Redirect to="/" />}
          </Route>
          <Route path="/">
            <ListingIndexPage />
          </Route>
        </Switch>
    </>
  );
}

export default App;
