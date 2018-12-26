/**
 * 创建项目相关人员
 */
import React, { Component } from 'react';
import { Field } from 'simple-react-form';
import Input from './ui-tags/Input.jsx';
import Owners from './ui-fields/Owners.jsx';

export default class OwnerCreate extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="self-manager-project-owners">
        <Field fieldName="owners" type={Owners} label="参与人员">
          <Field fieldName="name" type={Input} label="人员名称"/>
          <Field fieldName="role" type={Input} label="人员角色"/>
        </Field>
      </div>
    );
  }
}
