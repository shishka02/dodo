import React, { Component } from "react";
import "../App.css";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Input, Form, Select } from "antd";
import { addDateToFirebase } from "../firebase";
import {
  getTasksThunk,
  watchTaskRemovedEvent,
  watchTaskAddedEvent
} from "../redux/actions";
import RangePicker from "./rangePicker";
import uuid from "uuid/v4";
import moment from "moment";
import * as EmailValidator from "email-validator";

const Option = Select.Option;
let choice;
let leng = undefined;
class BookingForm extends Component {
  state = { err: false };
  componentDidMount() {
    const hash = this.props.location.hash;
    choice = hash.substr(4);
    leng = hash[1] + hash[2];

    this.props.dispatch(getTasksThunk());

    watchTaskAddedEvent(this.props.dispatch);
    watchTaskRemovedEvent(this.props.dispatch);
  }
  leaguage = {
    en: {
      header: "Please specify all required fields",
      name: "Name",
      surname: "Surname",
      phone: "Phone number",
      guest: "Number of guests",
      date: "Period of stay",
      dateErr: "date selection error",
      wish: "Wish",
      ok: "submit",
      err: "This Field is required",
      mailErr: "email is not valid",
      phoneErr: "phone number is not valid"
    },
    ru: {
      header: "Пожалуйста заполните все обязательные поля",
      name: "Имя",
      surname: "Фамилия",
      phone: "Номер телефона",
      guest: "Количество гостей",
      date: "Период пребывания",
      dateErr: "ошибка выбора даты",
      wish: "Пожелания",
      ok: "подтвердить",
      err: "Поле обязетельно к заполнению",
      mailErr: "не валидный email",
      phoneErr: "не валидній номер телефона"
    },
    uk: {
      header: "Будь ласка заповніть всі необхідні поля",
      name: "Ім'я",
      surname: "Прізвище",
      phone: "Номер телефону",
      guest: "Кількість гостей",
      date: "Період проживання",
      dateErr: "помилка вибора дати",
      wish: "Побажання",
      ok: "підтвердити",
      err: "Поле обов'язкове до заповнення",
      mailErr: "не валідний email",
      phoneErr: "не валідний номер телефону"
    }
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
    const form = this.props.form;

    form.validateFields((err, values) => {
      if (err) return;
      let from = moment(values.date.from);
      let to = moment(values.date.to);
      if (
        !values.date.from ||
        !values.date.to ||
        from <= moment().endOf("day")
      ) {
        this.setState({ err: true });
        return;
      } else {
        this.setState({ err: false });
      }
      values.quality = choice;
      values.id = uuid();
      values.leng = leng;
      from = from.format("YYYY-MM-DD");
      to = to.format("YYYY-MM-DD");

      addDateToFirebase(
        { ...values, from, to },
        choice,
        this.makeArrOfDates(from, to)
      );
      form.resetFields();

      alert(
        "Спасибо что выбрали наш отель мы отправили письмо c подтверждением на указаный email\n\nДякуємо що вибрали наш готель ми відравили вам лист на вказаний email\n\nthank you for choosing our hotel we send you an email with confirmation"
      );
    });
  };
  emailValidate = (rule, value, callback) => {
    if (EmailValidator.validate(value)) {
      callback();
    } else {
      callback("введен не валидный email");
    }
  };
  phoneValidate = (rule, value, callback) => {
    const phoneno = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;

    if (value.match(phoneno) || value === "" || value === " ") {
      callback();
    } else {
      callback("введен не валидный номер телефона");
    }
  };
  onCancel = () => {
    this.props.history.push("/");
    window.location.reload();
  };
  disabledDates = () => {
    if (this.props.tasks && this.props.tasks.dates) {
      let gg = Object.values(this.props.tasks.dates);
      let result = [];
      gg.forEach(i => {
        result.push(...i);
      });
      result = result.sort();
      let disabledDates = [];
      var i = result.length;
      while (i > 1) {
        let buff = result.filter(i => i === result[1]);
        if (buff.length >= this.props.tasks.number) {
          disabledDates.push(moment(result[1], "YYYY-MM-DD").toDate());
        }
        result.splice(0, buff.length);
        i = i - buff.length;
      }
      return disabledDates;
    }
  };
  render() {
    const leaguge = leng ? this.leaguage[leng] : this.leaguage.en;

    const {
      form: { getFieldDecorator }
    } = this.props;

    return (
      // <Modal
      //   title="Let's Get Started"
      //   className="GetStartedModal"
      //   onCancel={this.onCancel}
      //   visible
      //   onOk={this.handleCreate}
      //   okText="Submit"
      // >
      <Form
        style={{
          marginLeft: "auto",
          width: "80%",
          marginRight: "auto",
          marginTop: "2%"
        }}
        layout="vertical"
      >
        <h2>{leaguge.header}</h2>
        <Form.Item label={leaguge.name}>
          {getFieldDecorator("name", {
            rules: [
              {
                required: true,
                message: [leaguge.err]
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label={leaguge.surname}>
          {getFieldDecorator("secondName", {
            rules: [{ required: true, message: [leaguge.err] }]
          })(<Input />)}
        </Form.Item>

        <Form.Item label="Email">
          {getFieldDecorator("email", {
            rules: [
              { required: true, message: [leaguge.err] },
              { validator: this.emailValidate }
            ]
          })(<Input type="email" />)}
        </Form.Item>

        <Form.Item label={leaguge.phone}>
          {getFieldDecorator("phone", {
            rules: [{ validator: this.phoneValidate }],
            initialValue: " "
          })(<Input />)}
        </Form.Item>
        <Form.Item label={leaguge.guest}>
          {getFieldDecorator("numGuests", { initialValue: "1" })(
            <Select style={{ width: 60 }}>
              <Option value="1">1</Option>
              <Option value="2">2</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label={leaguge.date}>
          {getFieldDecorator("date", {
            rules: [{ required: true, message: [leaguge.err] }]
          })(
            <RangePicker
              leng={leng === "en" ? undefined : leng}
              datesToDisable={this.disabledDates()}
              dataFromRangePicker={this.dataFromRangePicker}
            />
          )}
          {this.state.err && (
            <div style={{ color: "red" }}>{leaguge.dateErr}</div>
          )}
        </Form.Item>

        <Form.Item label={leaguge.wish}>
          {getFieldDecorator("article", { initialValue: " " })(
            <Input.TextArea />
          )}
        </Form.Item>

        <Form.Item className="buttons-container">
          {/* <Button type="primary"  onClick={this.onCancel}>
            Cancel
          </Button> */}
          <Button type="primary" onClick={this.handleCreate}>
            {leaguge.ok}
          </Button>
        </Form.Item>
      </Form>
      // </Modal>
    );
  }
}
const mapState = state => ({
  tasks: state.tasks.find(i => i.quality === choice)
});
export default withRouter(connect(mapState)(Form.create()(BookingForm)));
