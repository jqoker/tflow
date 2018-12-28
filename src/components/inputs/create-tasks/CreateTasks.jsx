/**
 * 创建任务
 */
import React, { Component } from 'react';
import { Form, Field, ArrayComponent } from 'simple-react-form';
import { Card } from 'antd';
import Tasks from '../fields/Tasks.jsx';
import TextInput from '../tags/TextInput.jsx';

export default (props) => (
  <Field fieldName="tasks" type={Tasks}>
    <Field fieldName="title" type={TextInput} label="任务名称" placeholder="请输入任务名称"/>
    {/* <Field fieldName="tag" type={Checkbox} title="任务标签"/> */}
    <Field fieldName="description" type={TextInput} label="任务描述" placeholder="请输入任务描述"/>
    {/* <Field fieldName="complete" type={Radio} label="是否完成"/> */}
  </Field>
);
