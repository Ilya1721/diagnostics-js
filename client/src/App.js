import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/Navbar";
import Welcome from "./components/Welcome";
import Footer from "./components/Footer";
import Clinics from "./components/Clinics";
import Doctors from "./components/Doctors";

class App extends React.Component {
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
            </Switch>
          </main>
          <Footer />
        </Router>
      </Provider>
    );
  }
}

export default App;
