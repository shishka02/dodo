import React, { Component } from "react";
import { Form, Icon, Input, Button } from "antd";

const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
      pass: ""
    };
  }

  componentDidMount() {
    this.props.form.validateFields();
  }

  login = () => {
    this.props.form.validateFields((err, values) => {
      if (err) return;
      if (
        values.userName === "Elka" &&
        values.password === "23a5910e-632c-4c0b-b3b9-452af2062562"
      ) {
        window.localStorage.setItem("accesForRoomAdminPanel", true);
        window.location.reload();
      } else {
        return;
      }
    });
  };

  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form;
    // Only show error after a field is touched.
    const userNameError =
      isFieldTouched("userName") && getFieldError("userName");
    const passwordError =
      isFieldTouched("password") && getFieldError("password");
    return (
      <div>
        <Form className="login-form" layout="inline" onSubmit={this.clearState}>
          <div className="login-div">
            <FormItem
              validateStatus={userNameError ? "error" : "success"}
              help={userNameError || ""}
            >
              {getFieldDecorator("userName", {
                rules: [
                  { required: true, message: "Please input your username!" }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Username"
                />
              )}
            </FormItem>
            <FormItem
              validateStatus={passwordError ? "error" : "success"}
              help={passwordError || ""}
            >
              {getFieldDecorator("password", {
                rules: [
                  { required: true, message: "Please input your Password!" }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Password"
                />
              )}
            </FormItem>

            <FormItem>
              <Button
                className="login-form-button"
                type="primary"
                htmlType="submit"
                disabled={hasErrors(getFieldsError())}
                onClick={e => {
                  this.login(e);
                }}
              >
                {" "}
                loggin
              </Button>
            </FormItem>
          </div>
        </Form>
      </div>
    );
  }
}

export default Form.create()(Auth);
