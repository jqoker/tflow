import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import './ProjectDetail.css';
import {
  Card,
  Elevation,
  Classes,
  Alignment,
  Button,
  Text,
} from '@blueprintjs/core';
import './ProjectDetail.css';
import ProjectCreate from '../../ui-forms/ProjectCreate.jsx';
import projectSelector from '../../../selectors/project.js';
import CreateTasks from '../../inputs/CreateTasks.jsx';

// 时间节点名称map
const timestoneMap = {
  'START': '开发起始时间',
  'QA': '提测时间',
  'END': '开发截止时间',
  'UED': 'UED验收时间',
  'RELEASE': '项目上线时间',
};

@connect(projectSelector)
export default class ProjectDetail extends Component {
  constructor(props) {
    super(props);
  }
  pickOutProjectDetail() {
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
    const {
      name = '',
      owners = [],
      tasks = [],
      timestones = [],
    } = this.pickOutProjectDetail() || {};
    return (
      <div className="self-manager-projects-detail">
        <CreateTasks />
        <Card className="self-manager-projects-detail-card" elevation={Elevation.THREE}>
          <Text ellipsize={true} className="self-manager-add-project-title">项目详情</Text>
          <div className="project-detail-container">
            <div className="project-detail-name">
              <span className="detail-label">项目名称</span>{name}
            </div>
            <div className="project-detail-timestones">
              <span className="detail-label">时间节点</span>
              <ul className="timestones-list">
                {
                  Object.keys(timestones || {}).map((key, i) => {
                    const s = classnames('timestones-item-title', key);
                    return (
                      <li className="timestones-item" key={i}>
                        <div className={s}>
                          {timestoneMap[key]}
                          { /* timestones[key] */}
                        </div>
                        {timestones[key]}
                      </li>
                    )
                  })
                }
              </ul>
            </div>
            <div className="project-detail-tasks">
              <span className="detail-label">项目任务</span>
              <ul className="tasks-list">
                {
                  (tasks || []).map((task, j) => {
                    return (
                      <li className="tasks-item complete" key={j}>
                        <div className="tasks-item-title">
                          {task.title}
                        </div>
                        {task.description}
                      </li>
                    )
                  })
                }
              </ul>
            </div>
            <div className="project-detail-owners">
              <span className="detail-label">项目相关人员</span>
              <ul className="owners-list">
                {
                  (owners || []).map((owner, j) => {
                    return (
                      <li className="owners-item" key={j}>
                        <span className="owners-item-title">{owner.name}</span>
                        ({owner.role})
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          </div>
        </Card>
      </div>
    )
  }
}
