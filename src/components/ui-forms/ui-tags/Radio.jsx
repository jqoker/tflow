/**
 * 单选框
 */

import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Radio, RadioGroup } from "@blueprintjs/core";

const propTypes = {};
const defaultProps = {};

export default class RadioComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { value: 0 };
    this.handleRadioChange = this.handleRadioChange.bind(this);
  }
  handleRadioChange(e) {
    const { onChange } = this.props;
    const { target } = e || {};
    const { value } = target || {};
    this.setState({ value, });
    onChange && onChange(value);
  }
  render() {
    const { label } = this.props;
    return (
      <div className="radio-container" style={{display:'flex'}}>
        {/* 该部分样式，复用blueprintjs样式. */}
        <label className="bp3-label" style={{marginRight:10}}>
          {label}
          <span className="bp3-text-muted"> (必填项)</span>
        </label>
        <RadioGroup
          inline={true}
          name="group"
          onChange={this.handleRadioChange}
          selectedValue={String(this.state.value)}
        >
          <Radio {...this.state} label="是" value="1" />
          <Radio {...this.state} label="否" value="0" />
        </RadioGroup>
      </div>
    )
  }
}

Radio.propTypes = propTypes;
Radio.defaultProps = defaultProps;
