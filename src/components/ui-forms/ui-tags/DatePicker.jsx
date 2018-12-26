/**
 * 日期选择器
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Position } from "@blueprintjs/core";
import { DatePicker, DateInput, TimePrecision } from "@blueprintjs/datetime";
import { FieldType, registerType } from 'simple-react-form'
import './DatePicker.css';

const propTypes = {
  ...FieldType.propTypes,
  placeholder: PropTypes.string,
};
const defaultProps = {
  placeholder: '请选择日期',
};

export default class DatePickerComponent extends Component {
  constructor(props) {
    super(props);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.dataPickerFormatDate = this.dataPickerFormatDate.bind(this);
  }
  handleDateChange(date) {
    const { onChange } = this.props;
    onChange && onChange(date);
  }
  dataPickerFormatDate(date) {
    try {
      return date.toLocaleDateString();
    } catch(e) { console.log('DatePicker.FormatDate error', e); }
  }
  render() {
    const { placeholder, label = '' } = this.props;
    return (
      <div className="datepicker-container">
        {/* 该部分样式，复用blueprintjs样式. */}
        <label className="bp3-label">
          {label}
          <span className="bp3-text-muted"> (必填项)</span>
        </label>

        {/* 该部分使用DateInput. */}
        <DateInput
          placeholder={placeholder}
          formatDate={this.dataPickerFormatDate}
          parseDate={str => new Date(str)}
          reverseMonthAndYearMenus={false}
          popoverProps={{position: Position.BOTTOM}}
          onChange={date => this.handleDateChange(date)}
        />
      </div>
    )
  }
}
