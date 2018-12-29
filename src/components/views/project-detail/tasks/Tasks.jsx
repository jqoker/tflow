/**
 * 任务看板
 */

import React from 'react';
import classnames from 'classnames';
import s from './Tasks.styl';

export default ({ tasks, ...rest }) => (
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
)
