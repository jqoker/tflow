/**
 * 项目名称
 */
import React, { Component } from 'react';
import { Icon } from 'antd';
import UICardHOC from '../../hoc/UICardHOC.jsx';
export default UICardHOC({ title: '项目名称', isEdit: true })(({ name }) => (
  <span className={{}}>{name}</span>
));
