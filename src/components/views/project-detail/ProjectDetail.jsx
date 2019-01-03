/**
 * 项目详情(项目更新)
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Icon, Button, Drawer } from 'antd';
import { Form } from 'simple-react-form';
import Timestones from './timestones/Timestones.jsx';
import Tasks from './tasks/Tasks.jsx';
import Title from './Title.jsx';
import Participator from './participator/Participator.jsx';
import projectSelector from '../../../selectors/project.js';
import EditTitle from '../../inputs/create-project/Title.jsx';
import EditTimestones from '../../inputs/create-timestones/CreateTimestones.jsx';
import EditTasks from '../../inputs/create-tasks/CreateTasks.jsx';
import EditParticipator from '../../inputs/create-participator/CreateParticipator.jsx';
import ProjectDBHelper from '../../../IndexedDB/helper/ProjectDBHelper.js';
import {
  editProject,
  editProjectSuccess,
  editProjectFail,
} from '../../../actions/index.js';
import { OBJECT_UNIQUE_KEY, uniqueObjectArray } from '../../../utils/index.js';

@connect(projectSelector)
export default class ProjectDetail extends Component {
  constructor(props) {
    super(props)
    this.state = { visible: false };
  }
  getDetail() {
    const { id, projects } = this.props;
    let detail = {};
    // 首页进入的时候，详情页展示第一个项目详情
    if (!id) {
      detail = projects[0];
    } else {
      for (let i = 0, len = projects.length; i < len; i++) {
        if (projects[i].id === id) {
          detail = projects[i];
          break;
        }
      }
    }
    this.project = this.resetProject(detail);  // 当前项目
    return detail;
  }
  resetProject(detail) {
    // reselect下发的数据和表单原生数据格式不一致。
    // 这里需要将timestones回归至表单数据格式
    // 同时删除thingsNeedHandle属性
    const timestones = {};
    (detail.timestones.list || []).forEach(timestone => timestones[timestone.tag] = timestone.title);
    const project = {
      ...detail,
      timestones,
    };
    delete project.thingsNeedHandle;  // 去除计算出来的待办事项
    return project;
  };
  actionUpdateProject(changes = {}) {
    const { dispatch } = this.props;
    const { project } = this;
    dispatch(editProject());
    ProjectDBHelper.getInstance().update(project, changes, {
      success: () => {
        Object.keys(changes || {}).forEach((key) => project[key] = changes[key]);
        dispatch(editProjectSuccess(project));
      },
      fail: (e) => {
        console.log(e);
        dispatch(editProjectFail(e));
      }
    });
  }
  onSubmitProjectEdit() {
    const { name = '', timestones = {}, tasks = [], participators = [] } = this.state;
    const { timestones: oldTimestones, tasks: oldTasks, participators: oldParticipators } = this.project;
    const changes = {};
    // 计算项目名称
    if (name) {
      changes.name = name;
    }
    // 计算时间节点
    if (Object.keys(timestones || {}).length) {
      for (let key in oldTimestones) {
        if (timestones[key] == undefined) {
          timestones[key] = oldTimestones[key];
        }
      }
      changes.timestones = timestones;
    }
    // 计算任务
    let tasksCount = (tasks || [])
      .filter(task => task.title && task.description).length;
    if (tasksCount) {
      const nextTasks = oldTasks.concat(tasks);
      const uniqueTasks = uniqueObjectArray(nextTasks, OBJECT_UNIQUE_KEY.TITLE);
      changes.tasks = uniqueTasks;
    }
    // 计算参与者
    let participatorsCount = (participators || [])
      .filter(participator => participator.name && participator.role).length;
    if (participators.length) {
      const nextParticipators = oldParticipators.concat(participators);
      const uniqueParticipators = uniqueObjectArray(nextParticipators, OBJECT_UNIQUE_KEY.NAME);
      changes.participators = uniqueParticipators;
    }
    this.actionUpdateProject(changes);
  }
  render() {
    const detail = this.getDetail();
    const {
      name = '',
      participators = [],
      tasks = [],
      timestones = {},
    } = detail;
    const { visible } = this.state;
    // 如果没有数据null
    if (!detail) return null;
    const cardExtra = (
      <Button
      type="dashed"
      icon="edit"
      onClick={() => this.setState({visible:true})}
      >点击更新</Button>
    );
    return (
      <Card title="项目详情" extra={cardExtra}>
        <Title name={name} />
        <Timestones timestones={timestones} />
        <Tasks tasks={tasks} />
        <Participator participators={participators} />
        <Drawer title="项目更新(不更新字段不用填写)" width={1020} placement="right"
          visible={visible} onClose={() => this.setState({visible:false})}>
          <Form state={this.state} useFormTag={false} onChange={state => this.setState(state)}>
            <EditTitle />
            <EditTimestones />
            <EditTasks />
            <EditParticipator />
          </Form>
          <Button
            type="primary"
            size="large"
            icon="file-protect"
            onClick={this.onSubmitProjectEdit.bind(this)}
          >立即更新</Button>
        </Drawer>
      </Card>
    )
  }
}
