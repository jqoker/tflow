/**
 * 项目详情
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Icon, Button } from 'antd';
import { Form } from 'simple-react-form';
import Timestones from './timestones/Timestones.jsx';
import Tasks from './tasks/Tasks.jsx';
import Title from './Title.jsx';
import Participator from './participator/Participator.jsx';
import projectSelector from '../../../selectors/project.js';
import EditTitle from '../../inputs/create-project/Title.jsx';
import EditTimestones from '../../inputs/create-timestones/CreateTimestones.jsx';
import EditTasks from '../../inputs/create-tasks/CreateTasks.jsx';
import EditParticipator from '../../inputs/create-participator/CreateParticipator.jsx';

@connect(projectSelector)
export default class ProjectDetail extends Component {
  getDetail() {
    const { id, projects } = this.props;
    let detail = null;
    // 首页进入的时候，详情页展示第一个项目详情
    if (!id) {
      detail = projects[0];
    } else {
      for (let i = 0, len = projects.length; i < len; i++) {
        if (projects[i].id === id) {
          detail = projects[i];
          break;
        }
      }
    }
    return detail;
  }
  render() {
    const detail = this.getDetail() || {};
    const {
      name = '',
      participators = [],
      tasks = [],
      timestones = {},
    } = detail;
    // 如果没有数据null
    if (!detail) return null;
    return (
      <Card title="项目详情">
        <Form state={this.state} onChange={state => this.setState(state)}>
          <Title name={name} title="修改项目名称" onSubmitEdit={()=>console.log(this.state)}><EditTitle isModalUI/></Title>
          <Timestones timestones={timestones} title="修改项目时间节点"><EditTimestones isModalUI/></Timestones>
          <Tasks tasks={tasks} title="添加项目子任务"><EditTasks isModalUI/></Tasks>
          <Participator participators={participators} title="添加项目相关成员"><EditParticipator isModalUI/></Participator>
        </Form>
      </Card>
    )
  }
}
