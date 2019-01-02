import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Icon, Button } from 'antd';
import Timestones from './timestones/Timestones.jsx';
import Tasks from './tasks/Tasks.jsx';
import Title from './Title.jsx';
import Participator from './participator/Participator.jsx';
import UpdateModal from '../../inputs/updates/UpdateModal.jsx';
import { getProjectDetail } from '../../../actions/index.js';
import projectSelector from '../../../selectors/project.js';

@connect(projectSelector)
export default class ProjectDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }
  projDetail() {
    const { id, projects } = this.props;
    let detail = null;
    // 首页进入的时候，详情页展示第一个项目详情
    if (!id) {
      detail = projects[0];
    } else {
      for (var i = 0, len = projects.length; i < len; i++) {
        if (projects[i].id === id) {
          detail = projects[i];
          break;
        }
      }
    }
    return detail;
  }
  render() {
    const detail = this.projDetail() || {};
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
        <Title name={name} />
        <Timestones timestones={timestones}/>
        <Tasks tasks={tasks}/>
        <Participator participators={participators}/>
      </Card>
    )
  }
}
