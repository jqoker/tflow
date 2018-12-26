/**
 * 单选框
 */

import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Checkbox } from "@blueprintjs/core";

const propTypes = {};
const defaultProps = {};

export default class CheckboxComponent extends Component {
  constructor(props) {
    super(props);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }
  handleCheckboxChange(e) {
    const { onChange } = this.props;
    onChange && onChange(e.target.value);
    console.log(e.target.value);
  }
  render() {
    return (
      <Checkbox label="Gilad Gray" onChange={this.handleCheckboxChange}/>
    );
  }
}

CheckboxComponent.propTypes = propTypes;
CheckboxComponent.defaultProps = defaultProps;
