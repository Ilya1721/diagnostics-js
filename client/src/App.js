import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth/authActions";
import { initialize as initializeNavigation } from "./actions/navigation/navigationActions";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Welcome from "./components/welcome/Welcome";
import Clinics from "./components/welcome/Clinics";
import Doctors from "./components/welcome/Doctors";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import PrivateRoutes from "./components/protected/PrivateRoutes";

class App extends React.Component {
  componentDidMount() {
    store.dispatch(loadUser());
    store.dispatch(initializeNavigation());
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="wrapper">
            <Navbar />
            <main className="py-4 main">
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
                <PrivateRoutes />
              </Switch>
            </main>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
