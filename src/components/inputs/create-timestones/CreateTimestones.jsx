/**
 * 创建时间轴
 */

import React, { Component } from 'react';
import { Field } from 'simple-react-form';
import { Steps } from 'antd';
import UICardHOC from '../../hoc/UICardHOC.jsx';
import DatePicker from '../tags/DatePicker.jsx';

export default UICardHOC({ title: '关键时间节点' })((props) => (
  <Steps current={4} progressDot={true}>
    <Steps.Step title="开发起始时间" description={<Field fieldName="timestones.START" type={DatePicker}/>}/>
    <Steps.Step title="开发提测时间" description={<Field fieldName="timestones.QA" type={DatePicker}/>}/>
    <Steps.Step title="UED验收时间" description={<Field fieldName="timestones.UED" type={DatePicker}/>}/>
    <Steps.Step title="项目上线时间" description={<Field fieldName="timestones.RELEASE" type={DatePicker}/>}/>
  </Steps>
))
