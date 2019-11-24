import React, { Component } from "react";

import "./App.css";
import Admin from "./components/adminPage/mainAdminComponent";
import BookingForm from "./components/bookingForm";
import { withRouter } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div>
        {this.props.location.hash.substr(1) === "admin" ? (
          <Admin />
        ) : (
          <BookingForm />
        )}
      </div>
    );
  }
}

export default withRouter(App);
