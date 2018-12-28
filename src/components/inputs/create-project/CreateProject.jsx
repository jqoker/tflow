/**
 * 项目创建表单
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Field } from 'simple-react-form';
import { Button, Card, Steps, Popover } from 'antd';
import CreateParticipator from '../create-participator/CreateParticipator.jsx';
import CreateTasks from '../create-tasks/CreateTasks.jsx';
import DatePicker from '../tags/DatePicker.jsx';
import TextInput from '../tags/TextInput.jsx';
import ProjectDBHelper from '../../../IndexedDB/helper/ProjectDBHelper.js';
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
const inititalState = {
  name: '', // 项目名称
  participators: [
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
    this.onCreateProject = this.onCreateProject.bind(this);
  }
  tagTaskNotComplete() {
    (this.state.tasks || []).forEach(task => task.complete = 0);
  }
  onCreateProject() {
    this.tagTaskNotComplete();
    Alert.confirm({
      title: '确定创建该项目吗？',
      onOk: () => {
        const { dispatch } = this.props;
        dispatch(createProject());
        ProjectDBHelper.getInstance().insert(this.state, {
          success: (project) => {
            dispatch(createProjectSuccess(project));
            Toastr.success('项目创建成功.');
          },
          fail: (e) => {
            dispatch(createProjectFail(e));
            Toastr.error('项目创建失败, 请重试.');
          }
        });
      }
    })
  }
  render() {
    return (
      <div className={s.selfManagerProjectCreateContainer}>
        <Card
          title="创建项目"
        >
          <div className={s.selfManagerProjectCreateInputContent}>
            {/* 创建项目表单 */}
            <Form
              state={this.state}
              onChange={state => this.setState(state) }
            >
              {/* 基本选项 */}
              <div className={s.selfManagerProjectBasicInputInfo}>
                <Card title="项目名称" className={s.selfManagerProjectInputCard}>
                  <Field fieldName="name" type={TextInput} label="项目名称"/>
                </Card>
                {/* 时间节点 */}
                <Card title="关键时间节点" className={s.selfManagerProjectInputCard}>
                  <Steps current={4} progressDot={true}>
                    <Steps.Step title="开发起始时间" description={<Field fieldName="timestones.START" type={DatePicker}/>}/>
                    <Steps.Step title="开发提测时间" description={<Field fieldName="timestones.QA" type={DatePicker}/>}/>
                    <Steps.Step title="UED验收时间" description={<Field fieldName="timestones.UED" type={DatePicker}/>}/>
                    <Steps.Step title="项目上线时间" description={<Field fieldName="timestones.RELEASE" type={DatePicker}/>}/>
                  </Steps>
                </Card>
              </div>

              {/* 创建任务及相关人员 */}
              <Card title="项目任务" className={s.selfManagerProjectInputCard}>
                <CreateTasks />
              </Card>
              <Card title="项目相关人员" className={s.selfManagerProjectInputCard}>
                <CreateParticipator />
              </Card>
            </Form>

            {/* 提交按钮 */}
            <Button
              type="primary"
              icon="plus-square"
              size="large"
              onClick={this.onCreateProject}
            >创建项目</Button>
          </div>
        </Card>
      </div>
    );
  }
}