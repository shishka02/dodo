import React, { Component } from "react";
import { connect } from "react-redux";
import { Menu, Icon } from "antd";
import { setChoice } from "../../redux/actions";
import AddButton from "./ModalBtn";
class LeftMenu extends Component {
  handleClick = e => {
    this.props.dispatch(setChoice(e.key));
  };

  render() {
    return (
      <Menu
        onClick={this.handleClick}
        style={{ width: 256 }}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
      >
        <Menu.Item key="lux">
          <span>
            <Icon type="crown" />
            <span>люкс</span>
          </span>
        </Menu.Item>
        <Menu.Item key="regular">
          <span>
            <Icon type="key" />
            <span>стандарт</span>
          </span>
        </Menu.Item>
        <Menu.Item key="twoBeds">
          <span>
            <Icon type="team" />
            <span>стандарт с двумя кроватями</span>
          </span>
        </Menu.Item>
        <Menu.Item key="forOne">
          <span>
            <Icon type="user" />
            <span>для одного</span>
          </span>
        </Menu.Item>
        <AddButton />
      </Menu>
    );
  }
}

export default connect()(LeftMenu);
