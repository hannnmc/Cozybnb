import { React, useState, useEffect } from 'react';
import { Redirect, Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import ProfilePage from "./components/ProfilePage";

function App() {

  const initialState = { 
    user: JSON.parse(sessionStorage.getItem("currentUser"))
  };
  const {user} = initialState

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`/api/user/${user.id}`);
      console.log('sdf');
      setCurrentUser(await res.json());
    }
    fetchUser();
  }, []);

  return (
    <>
      <Navigation />
        <Switch>
          <Route path="/profile">
            <ProfilePage user={user}/>
            {/* <ProfilePage /> */}
          </Route>
          <Route path="/"></Route>
        </Switch>
    </>
  );
}

export default App;
