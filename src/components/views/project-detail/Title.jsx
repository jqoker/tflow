/**
 * 项目名称
 */
import React, { Component } from 'react';
import { Icon } from 'antd';
import UICardHOC from '../../hoc/UICardHOC.jsx';
export default UICardHOC({ title: '事务名称' })(({ name }) => (
  <span className={{}}>{name}</span>
));
