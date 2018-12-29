import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card } from 'antd';
import Timestones from './timestones/Timestones.jsx';
import Tasks from './tasks/Tasks.jsx';
import Participator from './participator/Participator.jsx';
import { getProjectDetail } from '../../../actions/index.js';
import s from './ProjectDetail.styl';
import projectSelector from '../../../selectors/project.js';

@connect(projectSelector)
export default class ProjectDetail extends Component {
  constructor(props) {
    super(props);
  }
  projDetail() {
    const { props } = this;
    const { projects, match } = props;
    const { id: urlParamId } = match.params || {};
    let detail = null;
    // 首页进入的时候，详情页展示第一个项目详情
    if (typeof urlParamId === 'undefined') {
      detail = projects[0];
    } else {
      for (var i = 0, len = projects.length; i < len; i++) {
        if (projects[i].id === parseInt(urlParamId, 10)) {
          detail = projects[i];
          break;
        }
      }
    }
    return detail;
  }
  render() {
    const { detail } = this.props;
    const {
      name = '',
      participators = [],
      tasks = [],
      timestones = {},
    } = this.projDetail() || {};
    return (
      <Card title="项目详情">
        <div className={s.selfManagerProjectDetail}>
          <Card title="项目名称" className={s.selfManagerProjectDetailCard}>{name}</Card>
          <Card title="关键时间节点" className={s.selfManagerProjectDetailCard}><Timestones timestones={timestones}/></Card>
          <Card title="项目任务看板" className={s.selfManagerProjectDetailCard}><Tasks tasks={tasks}/></Card>
          <Card title="项目相关人员" className={s.selfManagerProjectDetailCard}><Participator participators={participators}/></Card>
        </div>
      </Card>
    )
  }
}
