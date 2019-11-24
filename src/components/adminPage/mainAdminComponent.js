import React, { Component } from "react";
import AdminTable from "./table";
import { connect } from "react-redux";
import Auth from "./auth";
import { getTasksThunk } from "../../redux/actions";
import Menu from "./menu.jsx";
class Admin extends Component {
  componentDidMount() {
    this.props.dispatch(getTasksThunk());
  }

  render() {
    return window.localStorage.getItem("accesForRoomAdminPanel") ? (
      <div className="admin-page-container">
        <Menu />
        <AdminTable />
      </div>
    ) : (
      <Auth />
    );
  }
}

export default connect()(Admin);
