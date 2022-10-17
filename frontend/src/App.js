import React from 'react';
import { Redirect, Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import ProfilePage from "./components/ProfilePage";
import ListingIndexPage from './components/ListingIndexPage';
import ListingShowPage from './components/ListingShowPage/ListingShowPage';
import { useSelector } from 'react-redux';
function App() {


  const user = useSelector(({session}) => session.user);
  const loggedIn = !!user;
  return (
    <>
      <Navigation />
        <Switch>
          <Route path="/profile">
            {loggedIn ? <ProfilePage/> : <Redirect to="/" />}
          </Route>
          <Route path="/">
            <ListingIndexPage />
          </Route>
          <Route path="/listings/:listingId">
            <ListingShowPage />
          </Route>
        </Switch>
    </>
  );
}

export default App;
