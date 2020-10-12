import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Welcome from "./components/Welcome";
import Footer from "./components/Footer";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <main className="py-4">
            <Switch>
              <Route exact path="/">
                <Welcome />
              </Route>
            </Switch>
          </main>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
