/**
 * 单选框
 */

import React, { Component } from 'react';
import { Checkbox } from 'antd';
export default ({ onChange, ...rest }) => (
  <Checkbox onChange={e => onChange.(e.target.value)}></Checkbox>
)
