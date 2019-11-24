import { Modal, Form, Select, Input } from "antd";
import React, { Component } from "react";
import RangePicker from "../rangePicker";
const Option = Select.Option;
class AddForm extends Component {
  render() {
    const {
      form: { getFieldDecorator },
      onCancel,
      onCreate
    } = this.props;

    return (
      <Modal
        onCancel={onCancel}
        visible
        onOk={onCreate}
        title="Забронировать все номера на дату"
        okText="OK"
      >
        <Form layout="vertical">
          <Form.Item label="какие номера забронировать:">
            {getFieldDecorator("quality", {
              rules: [{ required: true, message: "This Field is required" }],
              initialValue: "regular"
            })(
              <Select style={{ width: 200 }}>
                <Option value="lux">люкс</Option>
                <Option value="regular">стандарт</Option>
                <Option value="twoBeds">стандарт с двумя кроватями</Option>
                <Option value="forOne">для одного</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="количество комнат:">
            {getFieldDecorator("days", {
              rules: [{ required: true, message: "This Field is required" }]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Date">
            {getFieldDecorator("date", {
              rules: [{ required: true, message: "This Field is required" }]
            })(<RangePicker />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(AddForm);
