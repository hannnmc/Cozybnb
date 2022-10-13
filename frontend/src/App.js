import React from "react";
import { Route, Switch } from "react-router-dom";
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
        </Switch>
    </>
  );
}

export default App;