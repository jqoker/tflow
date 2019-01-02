/**
 * 创建项目相关人员
 */
import React, { Component } from 'react';
import { Field } from 'simple-react-form';
import UICardHOC from '../../hoc/UICardHOC.jsx';
import TextInput from '../tags/TextInput.jsx';
import Participator from '../fields/Participator.jsx';

export default UICardHOC({ title: '项目相关人员' })((props) => (
  <Field fieldName="participators" type={Participator}>
    <Field fieldName="name" type={TextInput} label="人员名称"/>
    <Field fieldName="role" type={TextInput} label="人员角色"/>
  </Field>
));
