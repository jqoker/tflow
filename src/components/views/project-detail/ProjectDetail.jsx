import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import './ProjectDetail.styl';
import {
  Card,
  Button,
  Steps,
  Popover
} from 'antd';
import s from './ProjectDetail.styl';
import projectSelector from '../../../selectors/project.js';

// 时间节点名称map
const timestoneMap = {
  'START': '开发起始时间',
  'QA': '提测时间',
  'UED': 'UED验收时间',
  'RELEASE': '项目上线时间',
};
// 浮层提示
const titles = Object.keys(timestoneMap).map(key => timestoneMap[key]);
const dotStatus = { 'finish': '已完成', 'process': '进行中', 'wait': '未完成', };
const dotStatusTip = (dot, { status, index }) => (
  <Popover content={
    <p className={s.dotStatus}>
      <span className={s.dotStatusPhase}>阶段: {titles[index]}</span>
      状态:<span className={classnames(s.dotStatusColor, s[status])}>{dotStatus[status]}</span>
    </p>
  }>
    {dot}
  </Popover>
);

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
      participators = [],
      tasks = [],
      timestones = [],
    } = this.pickOutProjectDetail() || {};
    return (
      <div className={s.selfManagerProjectDetail}>
        <Card title="项目详情">
          <div className="project-detail-container">
            <Card title="项目名称" className={s.selfManagerProjectDetailCard}>
              {name}
            </Card>
            <Card title="关键时间节点" className={s.selfManagerProjectDetailCard}>
              <Steps current={1} progressDot={dotStatusTip}>
                {
                  Object.keys(timestones || {}).map((key, i) =>
                    <Steps.Step
                      key={i}
                      title={timestones[key]}
                      description={timestoneMap[key]}
                    />
                  )
                }
              </Steps>
            </Card>
            <Card title="项目任务看板" className={s.selfManagerProjectDetailCard}>
              <ul className={s.tasksList}>
                {
                  (tasks || []).map((task, j) => {
                    return (
                      <li className={classnames(s.tasksItem, {[s.complete]: !!parseInt(task.complete, 10)})} key={j}>
                        <p className={s.tasksItemTitle}>{task.title}</p>
                        <p className={s.tasksItemDescription}>{task.description}</p>
                      </li>
                    )
                  })
                }
              </ul>
            </Card>
            <Card title="项目相关人员" className={s.selfManagerProjectDetailCard}>
              <ul className={s.participatorList}>
                {
                  (participators || []).map((participator, j) =>
                    <li className={s.participatorItem} key={j}>
                      <span className={s.participatorItemTitle}>{participator.name}</span>
                      ({participator.role})
                    </li>
                  )
                }
              </ul>
            </Card>
          </div>
        </Card>
      </div>
    )
  }
}
