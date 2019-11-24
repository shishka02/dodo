import React from "react";
import moment from "moment";
import Helmet from "react-helmet";
import "moment/locale/ru";
import "moment/locale/uk";

import DayPickerInput from "react-day-picker/DayPickerInput";

import "react-day-picker/lib/style.css";

import MomentLocaleUtils, {
  formatDate,
  parseDate
} from "react-day-picker/moment";
class RangePicker extends React.Component {
  leng = {
    en: {
      from: "From",
      to: "To"
    },
    uk: {
      from: "Від",
      to: "До"
    },
    ru: {
      from: "C",
      to: "По"
    }
  };
  constructor(props) {
    super(props);
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
    this.state = {
      from: undefined,
      to: undefined
    };
  }

  showFromMonth() {
    this.props.onChange(this.state);
    const { from, to } = this.state;

    if (!from) {
      return;
    }
    if (moment(to).diff(moment(from), "months") < 2) {
      this.to.getDayPicker().showMonth(from);
    }
  }
  handleFromChange(from) {
    // Change the from date and focus the "to" input field

    this.setState({ from }, this.props.onChange(this.state));
  }
  handleToChange(to) {
    this.setState({ to }, this.showFromMonth);
  }
  render() {
    const { from, to } = this.state;
    const modifiers = { start: from, end: to };
    let { datesToDisable } = this.props;
    let datesToDisableTo = [
      {
        before: moment()
          .endOf("day")
          .toDate()
      }
    ];
    if (datesToDisable) {
      datesToDisable = [
        ...datesToDisable,
        {
          before: moment()
            .endOf("day")
            .toDate()
        }
      ];
      datesToDisableTo = [...datesToDisable, { before: from }];
    } else {
      datesToDisable = [
        {
          before: moment()
            .endOf("day")
            .toDate()
        }
      ];
    }

    return (
      <div className="InputFromTo">
        <DayPickerInput
          value={from}
          placeholder={this.leng[this.props.leng ? this.props.leng : "en"].from}
          format="DD/MM/YYYY"
          formatDate={formatDate}
          parseDate={parseDate}
          dayPickerProps={{
            disabledDays: datesToDisable,
            localeUtils: MomentLocaleUtils,
            locale: this.props.leng,
            selectedDays: [from, { from, to }],

            toMonth: to,
            modifiers,
            numberOfMonths: 2,
            onDayClick: () => this.to.getInput().focus()
          }}
          onDayChange={this.handleFromChange}
        />{" "}
        —{" "}
        <span className="InputFromTo-to">
          <DayPickerInput
            ref={el => (this.to = el)}
            value={to}
            placeholder={this.leng[this.props.leng ? this.props.leng : "en"].to}
            format="DD/MM/YYYY"
            formatDate={formatDate}
            parseDate={parseDate}
            dayPickerProps={{
              localeUtils: MomentLocaleUtils,
              locale: this.props.leng,
              selectedDays: [from, { from, to }],
              disabledDays: datesToDisableTo,
              modifiers,
              month: from,
              fromMonth: from,
              numberOfMonths: 2
            }}
            onDayChange={this.handleToChange}
          />
        </span>
        <Helmet>
          <style>{`
  .InputFromTo .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
    background-color: #ffb606 !important;
    color: #4a90e2;
  }
  .InputFromTo .DayPicker-Day {
    border-radius: 0 !important;
  }
  .InputFromTo .DayPicker-Day--start {
    border-top-left-radius: 50% !important;
    border-bottom-left-radius: 50% !important;
  }
  .InputFromTo .DayPicker-Day--end {
    border-top-right-radius: 50% !important;
    border-bottom-right-radius: 50% !important;
  }
  .InputFromTo .DayPickerInput-Overlay {
    width: 550px;
  }
  .InputFromTo-to .DayPickerInput-Overlay {
    margin-left: -198px;
  }
`}</style>
        </Helmet>
      </div>
    );
  }
}

export default RangePicker;
