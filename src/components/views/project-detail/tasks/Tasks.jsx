/**
 * 任务看板
 */

import React from 'react';
import { Icon } from 'antd';
import classnames from 'classnames';
import UICardHOC from '../../../hoc/UICardHOC.jsx';
import s from './Tasks.styl';

@UICardHOC({ title: '事务子任务看板' })
export default class Tasks extends React.Component {
  constructor(props) {
    super(props);
  }
  onClickDeleteTask(task) {
    const { onClickDeleteTask } = this.props;
    (typeof onClickDeleteTask === 'function') && onClickDeleteTask(task);
  }
  render() {
    const { tasks } = this.props;
    return (
      <ul className={s.tasksList}>
        {
          (tasks || []).map((task, j) => {
            return (
              <li className={classnames(s.tasksItem, {[s.complete]: !!parseInt(task.complete, 10)})} key={j}>
                <p className={s.tasksItemTitle}>{task.title}</p>
                <p className={s.tasksItemDescription}>{task.description}</p>
                <span className={s.tasksItemOpt} onClick={this.onClickDeleteTask.bind(this, task)}><Icon type="delete" /></span>
              </li>
            )
          })
        }
      </ul>
    )
  }
}
