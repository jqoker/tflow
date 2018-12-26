/**
 * 待办事项
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Tasks.css';

const propTypes = {
  tasks: PropTypes.array,
};
const defaultProps = {
  tasks: [],
};

export default class Tasks extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { tasks } = this.props;
    return (
      <div className="project-task-list">
        {
          (tasks || []).map((task, i) => (
            <div className="project-task-item" key={i}>
              <div className="count" style={task.taskCSSStyle}>{task.count}</div>
              <div className="title">{task.title}</div>
            </div>
          ))
        }
      </div>
    );
  }
}

Tasks.propTypes = propTypes;
Tasks.defaultProps = defaultProps;
