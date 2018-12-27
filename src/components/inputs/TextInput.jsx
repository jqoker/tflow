/**
 * 表单输入
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Input, Icon } from 'antd';

const propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
};
const defaultProps = {
  label: '',
  placeholder: '',
};

export default class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeValue = this.onChangeValue.bind(this);
  }
  onChangeValue(e) {
    const { onChange } = this.props;
    onChange && onChange(e.target.value);
  }
  render() {
    const {
      label,
      placeholder,
    } = this.props;
    return (
      <div className="text-input" style={{width: '320px'}}>
        <Input
          placeholder={placeholder}
          prefix={label}
          onChange={this.onChangeValue.bind(this)}
        />
      </div>
    );
  }
}
TextInput.propTypes = propTypes;
TextInput.defaultProps = defaultProps;
