/**
 * 输入框
 */
import React, { Component } from 'react';
import { FormGroup, InputGroup } from '@blueprintjs/core';
import PropTypes from 'prop-types';
import './Input.css';

const propTypes = {
  label: PropTypes.string,
}
const defaultProps = {
  label: '',
};

export default class Input extends Component {
  constructor(props) {
    super(props);
  }
  handleInputChange(e) {
    const { onChange } = this.props;
    onChange && onChange(e.target.value);
  }
  render() {
    const { label = '' } = this.props;
    const placeholderText = `请输入${label}`;
    return (
      <FormGroup
        label={label}
        labelFor="text-input"
        labelInfo="(必填项)"
        inline={true}
      >
        <InputGroup
          id="text-input"
          placeholder={placeholderText}
          onChange={this.handleInputChange.bind(this)}
          className="text-input-group"
        />
      </FormGroup>
    )
  }
}

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;
