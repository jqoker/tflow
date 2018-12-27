/**
 * 创建任务
 */
import React from 'react';
import PropTypes from 'prop-types';
import Formsy, { withFormsy } from 'formsy-react';
import { Button, Input } from 'antd';
import TextInput from './TextInput.jsx';

export default class CreateTasks extends React.Component {
  constructor(props) {
    super(props);
    this.enableButton = this.enableButton.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.state = {
      canSubmit: false,
      tasks: [{
        id: 0,
        title: '',
        description: '',
      }],
    };
  }
  enableButton() {
    this.setState({ canSubmit: true });
  }
  disableButton() {
    this.setState({ canSubmit: false });
  }
  deAttachTask(task) {
    const { tasks } = this.state;
    const { id: taskId } = task;
    console.log(taskId, tasks);
    let newTasks = (tasks || []).filter(task => task.id !== taskId);
    this.setState({ tasks: newTasks }, () => {
      console.log(this.state.tasks);
    });
  }
  attachTask() {
    this.setState({
      tasks: [
      ...this.state.tasks,
      {
        id: this.state.tasks.length,
        title: '',
        description: '',
      }]
    });
  }
  submit(model) {
    console.log('submit.', model);
  }
  render() {
    const { tasks } = this.state;
    return (
      <Formsy
        onValidSubmit={this.submit}
        onValid={this.enableButton}
        onInvalid={this.disableButton}
      >
        {
          (tasks || []).map((task, j) => {
            return (
              <div className="tasks" key={j}>
                <div className="task-item">
                  <TextInput
                    placeholder='请输入名称信息'
                    name={`task[${j}].title`}
                  />
                  <TextInput
                    placeholder='请输入描述信息'
                    name={`task[${j}].description`}
                  />
                </div>
                <Button type="primary" onClick={this.deAttachTask.bind(this, task)}>删除</Button>
              </div>
            );
          })
        }
        <Button type="primary" onClick={this.attachTask.bind(this)}>添加</Button>
        <button type="primary" disabled={!this.state.canSubmit}>创建任务</button>
      </Formsy>
    )
  }
}
