/**
 * 弹框
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert, Button, Intent } from '@blueprintjs/core';

const propTypes = {
  show: PropTypes.bool,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  message: PropTypes.string,
  intent: PropTypes.string,
  icon: PropTypes.string
};
const defaultProps = {
  show: false,
  onCancel: () => {},
  onConfirm: () => {},
  message: '删除后数据不可恢复，确定要删除吗？',
  intent: Intent.DANGER,
  icon: 'trash'
};

export default class AlertComponent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      show,
      onCancel,
      onConfirm,
      message,
      intent,
      icon,
    } = this.props;
    return (
      <Alert
        cancelButtonText="取消"
        confirmButtonText="确定"
        icon={icon}
        intent={intent}
        isOpen={show}
        onCancel={onCancel}
        onConfirm={onConfirm}
      >
        <p style={{lineHeight: '40px'}}>
          {message}
        </p>
      </Alert>
    )
  }
}

AlertComponent.propTypes = propTypes;
AlertComponent.defaultProps = defaultProps;
