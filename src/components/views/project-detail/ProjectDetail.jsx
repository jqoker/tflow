import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Icon, Button, Divider, Tabs } from 'antd';
import { Form } from 'simple-react-form';
import Title from './Title.jsx';
import Timestones from './timestones/Timestones.jsx';
import Participator from './participator/Participator.jsx';
import Tasks from './tasks/Tasks.jsx';
import EditTitle from '../../inputs/create-project/Title.jsx';
import EditTimestones from '../../inputs/create-timestones/CreateTimestones.jsx';
import EditTasks from '../../inputs/create-tasks/CreateTasks.jsx';
import EditParticipator from '../../inputs/create-participator/CreateParticipator.jsx';
import ProjectDBHelper from '../../../IndexedDB/helper/ProjectDBHelper.js';
import {
  editProject,
  editProjectSuccess,
  editProjectFail,
  deleteProject,
  deleteProjectSuccess,
  deleteProjectFail,
} from '../../../actions/index.js';
import { OBJECT_UNIQUE_KEY, uniqueObjectArray } from '../../../utils/index.js';
import Alert from '../../Alert.jsx';
import Toastr from '../../Toastr.js';
import s from './ProjectDetail.styl';

@connect()
export default class ProjectDetailList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.projectToEdit = null;
    this.columns = [{
      title: '事务名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '事务描述',
      dataIndex: 'description',
      key: 'description',
      className: s.projectDetailDescriptionCell,
    }, {
      title: '事务进度',
      dataIndex: 'percent',
      key: 'progress',
      align: 'center',
    },{
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span onClick={this.onClickDeleteProject.bind(this, record) } className={s.deleteProject}>
          <Icon type="delete" />删除
        </span>
      ),
    }];
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
    delete project.percent; // 去除进度
    delete project.thingsNeedToHandle;  // 去除计算出来的待办事项
    return project;
  };
  actionUpdateProject(changes = {}) {
    const { dispatch } = this.props;
    const { projectToEdit } = this;
    dispatch(editProject());
    ProjectDBHelper.getInstance().update(projectToEdit, changes, {
      success: () => {
        Object.keys(changes || {}).forEach((key) => projectToEdit[key] = changes[key]);
        dispatch(editProjectSuccess(projectToEdit));
        Toastr.success('更新成功.');
      },
      fail: (e) => {
        console.log(e);
        dispatch(editProjectFail(e));
        Toastr.error('更新失败，请稍后重试.');
      }
    });
  }
  onSubmitProjectEdit() {
    Alert.confirm({
      title: '确定修改吗？',
      onOk: () => {
        const {
          name = '',
          timestones = {},
          tasks = [],
          participators = [],
        } = this.state;
        const {
          timestones: oldTimestones,
          tasks: oldTasks,
          participators: oldParticipators,
        } = this.projectToEdit;
        const changes = {};
        if (name) {
          changes.name = name;
        }
        if (Object.keys(timestones || {}).length) {
          for (let key in oldTimestones) {
            if (timestones[key] == undefined) {
              timestones[key] = oldTimestones[key];
            }
          }
          changes.timestones = timestones;
        }
        let tasksCount = (tasks || []).filter(task => task.title && task.description).length;
        if (tasksCount) {
          const nextTasks = oldTasks.concat(tasks);
          const uniqueTasks = uniqueObjectArray(nextTasks, OBJECT_UNIQUE_KEY.TITLE);
          changes.tasks = uniqueTasks;
        }
        let participatorsCount = (participators || []).filter(participator => participator.name && participator.role).length;
        if (participators.length) {
          const nextParticipators = oldParticipators.concat(participators);
          const uniqueParticipators = uniqueObjectArray(nextParticipators, OBJECT_UNIQUE_KEY.NAME);
          changes.participators = uniqueParticipators;
        }
        this.actionUpdateProject(changes);
      }
    });
  }
  expandedIcon(props) {
    const { expanded, record, onExpand } = props;
    const handler = (e) => {
      onExpand(record, e)
      if (!expanded) {
        this.projectToEdit = this.resetProject(record);
      }
    };
    return (
      <Icon
        type={expanded ? 'caret-up' : 'caret-down'}
        onClick={handler}
        className={s.expandIcon}
      />
    );
  }
  onClickDeleteProject(record) {
    Alert.confirm({
      onOk: () => {
        const { dispatch } = this.props;
        ProjectDBHelper.getInstance()
          .delete(record, {
            success: () => {
              dispatch(deleteProjectSuccess(record));
              Toastr.success('删除成功.');
            },
            fail: (e) => {
              console.log(e);
              dispatch(deleteProjectFail(e));
              Toastr.error('删除失败, 请重试.');
            }
        });
      }
    });
  }
  onClickDeleteTask(task) {
    Alert.confirm({
      title: '确定删除该子任务吗？',
      onOk: () => {
        const { tasks: currentTasks } = this.projectToEdit;
        const tasksLeft = currentTasks.filter(item => item.title !== task.title);
        this.actionUpdateProject({ tasks: tasksLeft });
      }
    });
  }
  moreInfo(record) {
    return (
      <Tabs defaultActiveKey="1" style={{maxWidth: '1130px'}}>
        <Tabs.TabPane tab="详情" key="1">
          <Title name={record.name} />
          <Timestones timestones={record.timestones} />
          <Tasks tasks={record.tasks} onClickDeleteTask={this.onClickDeleteTask.bind(this)}/>
          <Participator participators={record.participators}/>
        </Tabs.TabPane>
        <Tabs.TabPane tab="编辑" key="2">
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
        </Tabs.TabPane>
      </Tabs>
    )
  }
  render() {
    const { projects } = this.props;
    return (
      <Table
        dataSource={projects}
        columns={this.columns}
        rowKey={record => record.name}
        pagination={{position: 'top'}}
        expandIcon={this.expandedIcon.bind(this)}
        expandedRowRender={this.moreInfo.bind(this)}
      />
    )
  }

}
