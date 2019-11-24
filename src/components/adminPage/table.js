import React, { Component } from "react";
import { connect } from "react-redux";
import { Table } from "antd";
import { removeRoomFromFirebase } from "../../firebase";
import { getTasksThunk, watchTaskAddedEvent } from "../../redux/actions";

class AdminTable extends Component {
  componentDidMount() {
    watchTaskAddedEvent(this.props.dispatch);
  }
  delete = value => {
    removeRoomFromFirebase(value);
    this.props.dispatch(getTasksThunk());
  };
  columns = [
    {
      title: "Имя",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Фамилия",
      dataIndex: "secondName",
      key: "secondName"
    },
    {
      title: "EMAIL",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "Номер телефона",
      dataIndex: "phone",
      key: "phone"
    },
    {
      title: "заселениe",
      dataIndex: "from",
      key: "from"
    },
    {
      title: "выселениe",
      dataIndex: "to",
      key: "to"
    },
    {
      title: "пожелания",
      dataIndex: "article",
      key: "article"
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <span>
          <a href="javascript:void(0);" onClick={() => this.delete(record)}>
            Delete
          </a>
        </span>
      )
    }
  ];

  render() {
    let customers = [];
    if (this.props.rooms && this.props.rooms.customers) {
      customers = Object.values(this.props.rooms.customers);
    }

    return (
      <Table
        rowKey="id"
        style={{ width: "100%" }}
        columns={this.columns}
        dataSource={customers}
      />
    );
  }
}

const mapState = state => ({
  rooms: state.tasks.find(i => i.quality === state.TableChoice),
  state: state
});
export default connect(mapState)(AdminTable);
