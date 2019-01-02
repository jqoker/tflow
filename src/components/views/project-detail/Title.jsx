/**
 * 项目名称
 */
import React, { Component } from 'react';
import { Icon } from 'antd';
import UICardHOC from '../../hoc/UICardHOC.jsx';
export default UICardHOC({ title: '项目名称' })(({ name }) => (
  <div className={{}}>
    {name}
    <Icon type="edit" theme="twoTone" style={{fontSize: '20px'}}/>
  </div>
));
