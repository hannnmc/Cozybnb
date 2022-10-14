import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import ProfilePage from "./components/ProfilePage";

function App() {
  return (
    <>
      <Navigation />
        <Switch>
          <Route path="/profile">
            <ProfilePage />
          </Route>
          <Route path="/"></Route>
        </Switch>
    </>
  );
}

export default App;