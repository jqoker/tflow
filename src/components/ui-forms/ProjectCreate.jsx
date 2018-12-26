/**
 * 项目创建表单
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Field } from 'simple-react-form';
import { Button, Card, Elevation, Text, Intent } from '@blueprintjs/core';
import TasksCreate from './TasksCreate.jsx';
import OwnerCreate from './OwnerCreate.jsx';
import DatePicker from './ui-tags/DatePicker.jsx';
import Input from './ui-tags/Input.jsx';
import './ProjectCreate.css';
import ProjectDBHelper from '../../IndexedDB/helper/ProjectDBHelper.js';
import {
  createProject,
  createProjectSuccess,
  createProjectFail,
} from '../../actions';
import { Toastr } from '../Toastr.js';
import Alert from '../Alert.jsx';

/**
 * 初始状态。类同于store-object
 */
const now = new Date();
const inititalState = {
  name: '', // 项目名称
  owners: [
    /**
     * name: 姓名
     * role: 角色
     */
  ],
  tasks: [
    /**
     * title: 名称
     * tag: 标签
     * description: 描述
     * complete: 完成标识
     */
  ],
  /**
   * 时间节点
   */
  timestones: {
    // 起始时间
    START: now,
    // 提测时间
    QA: now,
    // UED时间
    UED: now,
    // 截止时间
    END: now,
    // 发布时间
    RELEASE: now,
  }
};

@connect()
export default class ProjectCreate extends Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
    this.onCreateProject = this.onCreateProject.bind(this);
    this.onStateChange = this.onStateChange.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
  }
  onCreateProject() {
    this.setState({ show: true });
  }
  onStateChange(state) {
    this.setState(state);
  }
  onCancel() {
    this.setState({ show: false });
  }
  onConfirm() {
    const { dispatch } = this.props;
    dispatch(createProject());
    ProjectDBHelper.getInstance().insert(this.state, {
      success: (project) => {
        dispatch(createProjectSuccess(project));
        this.setState({ show: false }, () => {
          Toastr.show({ message: '项目创建成功.', intent: 'success' });
        });
      },
      fail: (e) => {
        dispatch(createProjectFail(e));
        Toastr.show({ message: '项目创建失败, 请重试.', intent: 'warning' });
      }
    });
  }
  render() {
    const { show } = this.state;
    return (
      <div className="self-manager-projects-create">
        <Card className="self-manager-projects-create-card" elevation={Elevation.THREE}>
          <Text ellipsize={true} className="self-manager-add-project-title">创建项目</Text>
          <div className="self-manager-project-form-container">
            {/* 创建项目表单 */}
            <Form
              state={this.state}
              onChange={this.onStateChange}
              className="self-manager-project-form"
            >
              {/* 基本选项 */}
              <div className="self-manager-project-basic">
                <Field fieldName="name" type={Input} label="项目名称"/>
                {/* 时间节点 */}
                <div className="self-manager-project-timestones">
                  <Text ellipsize={true} className="project-timestones-title">时间节点</Text>
                  <Field fieldName="timestones.START" type={DatePicker} label="开发起始时间" placeholder="请选择开发起始时间"/>
                  {/* <Field fieldName="timestones.END" type={DatePicker} label="开发截止时间" placeholder="请选择开发截止时间"/> */}
                  <Field fieldName="timestones.QA" type={DatePicker} label="开发提测时间" placeholder="开发提测时间"/>
                  <Field fieldName="timestones.UED" type={DatePicker} label="UED验收时间" placeholder="请选择UED验收时间"/>
                  <Field fieldName="timestones.RELEASE" type={DatePicker} label="项目上线时间" placeholder="请选择项目上线时间"/>
                </div>
              </div>

              {/* 创建任务及相关人员 */}
              <TasksCreate />
              <OwnerCreate />
            </Form>

            {/* 提交按钮 */}
            <Button
              text="创建项目"
              intent="primary"
              icon="add"
              large={true}
              onClick={this.onCreateProject}
            />
          </div>
        </Card>
        <Alert
          show={show}
          icon="tick-circle"
          onCancel={this.onCancel}
          onConfirm={this.onConfirm}
          message={'确定创建该项目吗？'}
          intent={Intent.SUCCESS}
        />
      </div>
    );
  }
}
