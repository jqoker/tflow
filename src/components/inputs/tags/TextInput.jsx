/**
 * 表单输入
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Input, Icon } from 'antd';
import s from './TextInput.styl';

export default ({ label, placeholder, onChange }) => (
  <div className={s.textInput}>
    <label className={s.textInputLabel}>{label}{/*(必填项)*/}</label>
    <Input
      placeholder={placeholder}
      onChange={e => onChange(e.target.value) }
    />
  </div>
)
