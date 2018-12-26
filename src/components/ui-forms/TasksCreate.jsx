/**
 * 创建任务
 */
import React, { Component } from 'react';
import { Form, Field, ArrayComponent } from 'simple-react-form';
import { Button, Classes } from '@blueprintjs/core';
import Tasks from './ui-fields/Tasks.jsx';
import Input from './ui-tags/Input.jsx';
import Radio from './ui-tags/Radio.jsx';
import Checkbox from './ui-tags/Checkbox.jsx';
import DatePicker from './ui-tags/DatePicker.jsx';
import './TasksCreate.css';

export default class TasksCreate extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="self-manager-project-tasks">
        <Field fieldName="tasks" type={Tasks} label="任务集">
          <Field fieldName="title" type={Input} label="任务名称"/>
          {/* <Field fieldName="tag" type={Checkbox} title="任务标签"/> */}
          <Field fieldName="description" type={Input} label="任务描述"/>
          {/* <Field fieldName="complete" type={Radio} label="是否完成"/> */}
        </Field>
      </div>
    );
  }
}
