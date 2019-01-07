/**
 * 项目创建表单
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Field } from 'simple-react-form';
import { Button, Card, Steps, Popover } from 'antd';
import CreateParticipator from '../create-participator/CreateParticipator.jsx';
import CreateTasks from '../create-tasks/CreateTasks.jsx';
import CreateTimestones from '../create-timestones/CreateTimestones.jsx';
import Title from './Title.jsx';
import TextInput from '../tags/TextInput.jsx';
import ProjectDBHelper from '../../../IndexedDB/helper/ProjectDBHelper.js';
import { projmodel } from '../../../IndexedDB/store-object.js';
import {
  createProject,
  createProjectSuccess,
  createProjectFail,
} from '../../../actions';
import Toastr from '../../Toastr.js';
import Alert from '../../Alert.jsx';
import s from './CreateProject.styl';

/**
 * 初始状态。类同于store-object
 */
const now = new Date();
const inititalState = Object.assign({}, projmodel);

@connect()
export default class ProjectCreate extends Component {
  constructor(props) {
    super(props);
  }
  onCreateProject() {
    const { state } = this;
    const newState = { ...state, complete: 0 }  // 标识项目未完成(新创建的项目不能为已完成);
    Alert.confirm({
      title: '确定创建该事务吗？',
      onOk: () => {
        const { dispatch } = this.props;
        dispatch(createProject());
        ProjectDBHelper.getInstance().insert(newState, {
          success: (project) => {
            dispatch(createProjectSuccess(project));
            Toastr.success('事务创建成功.');
            setTimeout(() => {
              window.location.reload();
            }, 300);
          },
          fail: (e) => {
            dispatch(createProjectFail(e));
            Toastr.error('事务创建失败, 请重试.');
          }
        });
      }
    })
  }
  render() {
    return (
      <div className={s.selfManagerCreateProjectContainer}>
        {/* 创建项目表单 */}
        <Form state={this.state} onChange={state => this.setState(state)}>
          <Title />
          <CreateTimestones />
          <CreateTasks />
          <CreateParticipator />
        </Form>
        {/* 提交按钮 */}
        <Button
          type="primary"
          icon="plus-square"
          size="large"
          onClick={this.onCreateProject.bind(this)}>创建事务</Button>
      </div>
    );
  }
}
