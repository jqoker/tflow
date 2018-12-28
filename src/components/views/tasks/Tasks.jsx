/**
 * 待办事项
 */
import React, { Component } from 'react';
import classnames from 'classnames';
import s from './Tasks.styl';

export default ({ tasks }) => (
  <div className={s.projectTaskList}>
    {
      (tasks || []).map((task, i) => (
        <div className={s.projectTaskItem} key={i}>
          <div className={s.taskItemCount} style={task.taskCSSStyle}>{task.count}</div>
          <div className={s.taskItemTitle}>{task.title}</div>
        </div>
      ))
    }
  </div>
)
