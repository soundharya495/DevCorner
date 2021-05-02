import React, { Fragment, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/profile-forms/CreateProfile";
import EditProfile from "./components/profile-forms/EditProfile";
import AddExperience from "./components/profile-forms/AddExperience";
import AddEducation from "./components/profile-forms/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";
import "./App.css";

//PrivateRoute
import PrivateRoute from "./components/routing/PrivateRoute";
//Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />

          <Alert />
          <Switch>
            <Route
              exact
              path="/register"
              render={(props) => (
                <section className="container">
                  <Register {...props} />
                </section>
              )}
            />
            <Route
              exact
              path="/login"
              render={(props) => (
                <section className="container">
                  <Login {...props} />
                </section>
              )}
            />
            <Route
              exact
              path="/profiles"
              render={(props) => (
                <section className="container">
                  <Profiles {...props} />
                </section>
              )}
            />
            <Route
              exact
              path="/profile/:id"
              render={(props) => (
                <section className="container">
                  <Profile {...props} />
                </section>
              )}
            />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute
              exact
              path="/create-profile"
              component={CreateProfile}
            />
            <PrivateRoute exact path="/posts" component={Posts} />
            <PrivateRoute exact path="/posts/:id" component={Post} />
            <PrivateRoute exact path="/edit-profile" component={EditProfile} />
            <PrivateRoute
              exact
              path="/add-experience"
              component={AddExperience}
            />
            <PrivateRoute
              exact
              path="/add-education"
              component={AddEducation}
            />
          </Switch>
        </Fragment>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
