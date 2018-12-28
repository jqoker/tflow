/**
 * 单选框
 */

import React, { Component } from 'react';
import { Radio } from 'antd';

export default class RadioComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { value: 0 };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    const { onChange } = this.props;
    const value = e.target.value;
    this.setState({ value });
    onChange && onChange(value);
  }
  render() {
    const { label } = this.props;
    return (
      <div className="radio-container">
        <Radio.Group
          onChange={this.handleChange}
          value={String(this.state.value)}
        >
          <Radio value="1">是</Radio>
          <Radio value="0">否</Radio>
        </Radio.Group>
      </div>
    )
  }
}

Radio.propTypes = propTypes;
Radio.defaultProps = defaultProps;
