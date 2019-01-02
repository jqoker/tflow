/**
 * 任务看板
 */

import React from 'react';
import classnames from 'classnames';
import UICardHOC from '../../../hoc/UICardHOC.jsx';
import s from './Tasks.styl';

export default UICardHOC({ title: '项目任务看板', isEdit: true })(({ tasks, ...rest }) => (
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
));
