/**
 * 项目名称
 */
import React, { Component } from 'react';
import { Field } from 'simple-react-form';
import UICardHOC from '../../hoc/UICardHOC.jsx';
import TextInput from '../tags/TextInput.jsx';

export default UICardHOC({ title: '项目名称' })((props) => (
  <div className={{}}>
    <Field fieldName="name" type={TextInput} label="项目名称"/>
    <Field fieldName="description" type={TextInput} label="项目描述"/>
  </div>
));
