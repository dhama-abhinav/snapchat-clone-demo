import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { Chats } from "./Chats";
import { ChatView } from "./ChatView";
import { login, logout, selectUser } from "./features/appSlice";
import { auth } from "./firebase";
import { Login } from "./Login";
import { Preview } from "./Preview";
import { WebcamCapture } from "./WebcamCapture";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  //for making app to be persistance when the user is logged in otherwise when we refresh our app after login ,it will reset user to null and we dont want that
  //so on first mount i want to trigger the folowing code
  useEffect(() => {
    //at any point if the authenticate state changes even if u are persistive , u are logged in before , they have a way of tracking it
    auth.onAuthStateChanged((authuser) => {
      if (authuser) {
        dispatch(
          login({
            username: authuser.displayName,
            profilePic: authuser.photoURL,
            id: authuser.uid,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <img
              className="app__logo"
              src="https://lakeridgenewsonline.com/wp-content/uploads/2020/04/snapchat.jpg"
              alt=""
            />
            <div className="app__body">
              <div className="app__bodyBackground">
                <Switch>
                  <Route path="/chats/view">
                    <ChatView />
                  </Route>
                  <Route path="/chats">
                    <Chats />
                  </Route>
                  <Route path="/preview">
                    <Preview />
                  </Route>
                  <Route exact path="/">
                    <WebcamCapture />
                  </Route>
                </Switch>
              </div>
            </div>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
