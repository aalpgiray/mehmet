import * as React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, NavLink, Route } from "react-router-dom";
import { store } from "../store";
import About from "./About";
import CarList from "./CarList";
import Home from "./Home";

export default () => (
  <Router>
    <Provider store={store}>
      <NavLink activeStyle={{ fontWeight: "bold" }} to="/about">
        About
      </NavLink>
      <NavLink activeStyle={{ fontWeight: "bold" }} to="/carlist/alp">
        Alp's Cars
      </NavLink>
      <NavLink activeStyle={{ fontWeight: "bold" }} to="/carlist/mehmet">
        Mehmet's Cars
      </NavLink>
      <NavLink exact activeStyle={{ fontWeight: "bold" }} to="/">
        Home
      </NavLink>
      <Route path="/about" component={About} />
      <Route exact path="/" component={Home} />
      <Route exact path="/carlist/:user" component={CarList} />
    </Provider>
  </Router>
);
