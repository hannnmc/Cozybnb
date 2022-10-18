import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import ProfilePage from "./components/ProfilePage";
import ListingIndexPage from './components/ListingIndexPage';
import ListingShowPage from './components/ListingShowPage/ListingShowPage';
import { useSelector, useDispatch } from 'react-redux';
// import { fetchUsers } from './store/users';


function App() {
  // const dispatch = useDispatch();
  // useEffect(()=> {
  //   dispatch(fetchUsers());
  // },[])

  const user = useSelector(({session}) => session.user);

  const loggedIn = !!user;

  return (
    <>
      <Navigation />
        <Switch>
          {/* <Route path="/listings/new">
          <NewListingPage />
          </Route> */}
          <Route exact path="/listings/:listingId">
            <ListingShowPage />
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
