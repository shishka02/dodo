import React, { Component } from "react";
import { Button } from "antd";

import BookAll from "./BookAll.jsx";
import uuid from "uuid/v4";
import moment from "moment";
import { addDateToFirebase } from "../../firebase";
class AddButton extends Component {
  state = {
    visible: false
  };

  makeArrOfDates = (from, to) => {
    let arrOfResults = [from];
    if (from.substr(5, 2) === to.substr(5, 2)) {
      const fromDay = parseInt(from.substr(8, 2), 10);
      let result = parseInt(to.substr(8, 2), 10) - fromDay;

      let i = result;
      for (i; i > 0; i--) {
        arrOfResults.push(from.substr(0, 8) + (fromDay + i));
      }
    } else if (from.substr(5, 2) !== to.substr(5, 2)) {
      const firstResult = parseInt(to.substr(8, 2), 10);
      const secondResult = 31 - parseInt(from.substr(8, 2), 10);
      let i = firstResult;

      for (i; i > 0; i--) {
        arrOfResults.push(
          to.substr(0, 8) + (parseInt(to.substr(8, 2), 10) - i + 1)
        );
      }
      let b = secondResult;

      for (b; b > 0; b--) {
        arrOfResults.push(
          from.substr(0, 8) + (parseInt(from.substr(8, 2), 10) + b)
        );
      }
    }
    return arrOfResults;
  };

  handleCreate = () => {
    const form = this.formRef.props.form;

    form.validateFields((err, values) => {
      if (err) return;
      let from = moment(values.date.from);
      let to = moment(values.date.to);
      values.id = uuid();
      from = from.format("YYYY-MM-DD");
      to = to.format("YYYY-MM-DD");
      values.name = "ADMIN";
      values.secondName = "забронировано " + values.days + " комнат";

      let arr = [];
      const ArrOfDates = this.makeArrOfDates(from, to);

      let i = parseInt(values.days, 10);
      for (i; i > 0; i--) {
        arr.push(...ArrOfDates);
      }
      addDateToFirebase(
        { ...values, from, to },
        values.quality,

        arr
      );

      form.resetFields();
      this.setState({ visible: false });
    });
  };

  // TODO: Recheck and use modern way of refs
  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    return (
      <div className="buttons-change">
        <Button
          style={{ marginLeft: "20%" }}
          type="primary"
          onClick={() => this.setState({ visible: true })}
        >
          {"Забронировать"}
        </Button>
        {this.state.visible && (
          <BookAll
            selected={this.props.selectedRow}
            wrappedComponentRef={this.saveFormRef}
            onCancel={() => this.setState({ visible: false })}
            onCreate={this.handleCreate}
          />
        )}
      </div>
    );
  }
}

export default AddButton;
