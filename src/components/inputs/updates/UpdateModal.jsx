/**
 * 更新模态框
 */

import React, { Component } from 'react';
import { Modal, Button } from 'antd';

export default ({ title, visible, onOk, onCancel, okText, cancelText, children, ...rest }) => (
  <Modal
    title={title}
    visible={visible}
    onOk={onOk}
    onCancel={onCancel}
    okText={okText}
    cancelText={cancelText}
  >
  {children}
  </Modal>
)
