import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth/authActions";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Welcome from "./components/welcome/Welcome";
import Clinics from "./components/welcome/Clinics";
import Doctors from "./components/welcome/Doctors";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

class App extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Navbar />
          <main className="py-4">
            <Switch>
              <Route exact path="/">
                <Welcome />
              </Route>
              <Route exact path="/clinics">
                <Clinics />
              </Route>
              <Route exact path="/doctors">
                <Doctors />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/register">
                <Register />
              </Route>
            </Switch>
          </main>
          <Footer />
        </Router>
      </Provider>
    );
  }
}

export default App;
