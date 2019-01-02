/**
 * 项目名称
 */
import React, { Component } from 'react';
import { Field } from 'simple-react-form';
import UICardHOC from '../../hoc/UICardHOC.jsx';
import TextInput from '../tags/TextInput.jsx';

export default UICardHOC({ title: '项目名称' })((props) => (
  <Field fieldName="name" type={TextInput} label="项目名称"/>
));
