import React from 'react';
import { Redirect, Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import ProfilePage from "./components/ProfilePage";
import ListingIndexPage from './components/ListingIndexPage';
// import csrfFetch from './store/csrf';
import { useSelector } from 'react-redux';
function App() {

  // const initialState = { 
  //   user: JSON.parse(sessionStorage.getItem("currentUser"))
  // };
  // const {user} = initialState

  // const [currentUser, setCurrentUser] = useState(user);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const res = await csrfFetch(`/api/user/${user.id}`, {
  //       headers : { 
  //         'Content-Type': 'application/json',
  //         'Accept': 'application/json'
  //        }
  //     });
  //     // const data = await res.json();
  //     console.log(user)
  //     console.log(res)
  //     console.log(res.json());
  //     setCurrentUser(res.json());
  //   }
  //   fetchUser();
  // }, []);
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
        </Switch>
    </>
  );
}

export default App;
