/**
 * 项目列表
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Card,
  Elevation,
  Text,
  ButtonGroup,
  Divider
} from '@blueprintjs/core';
import { withRouter } from 'react-router-dom';
import {
  deleteProject,
  deleteProjectSuccess,
  deleteProjectFail,
} from '../../../actions/index.js';
import './ProjectList.css';
import Tasks from '../tasks/Tasks.jsx';
import ProjectDBHelper from '../../../IndexedDB/helper/ProjectDBHelper.js';
import Alert from '../../Alert.jsx';
import { Toastr } from '../../Toastr.js';

@withRouter
@connect()
export default class ProjectList extends Component {
  constructor(props) {
    super(props);
    this.state = { showAlert: false, };
    this.projectToRemove = null;
  }
  componentDidMount() {}
  onRemoveProject(project) {
    this.projectToRemove = project;
    this.setState({ showAlert: true });
  }
  onLookDetailProject(project) {
    //// TODO: project detail
    const { history } = this.props;
    history.push(`/project/detail/${project.id}`);
  }
  onEditProject(project) {
    //// TODO: project edit
  }
  onCancel() {
    this.setState({ showAlert: false });
  }
  onConfirm() {
    const { dispatch } = this.props;
    ProjectDBHelper.getInstance()
                  .delete(this.projectToRemove, {
                    success: () => {
                      dispatch(deleteProjectSuccess(this.projectToRemove));
                      this.setState({ showAlert: false }, () => {
                        Toastr.show({ message: '删除成功.', intent: 'success', });
                      });
                    },
                    fail: (e) => {
                      dispatch(deleteProjectFail(e));
                      Toastr.show({ message: '删除失败, 请重试.', intent: 'warning', });
                    }
                  });
  }
  render() {
    const { projects = [] } = this.props;
    const { showAlert = false } = this.state;
    /**
     * // TODO: 数据处理放置于reselect中
     * 视图层只负责渲染
     */
    return (
      <div className="self-manager-projects">
        {/* 项目列表 */}
        <ul className="self-manager-project-list-container">
          {
            (projects || []).map((item, j) =>
                    <li key={j} className="project-list-item">
                      <Card className="project-item" elevation={Elevation.THREE}>
                        <Text className="project-title" ellipsize={true} tagName="div">{item.name}</Text>
                        {
                          /**!!item.timestones ?
                            <Text className="project-timestones" ellipsize={true} tagName="div">
                              <span className="project-timestones-label">开发时间段</span>
                              {`${item.timestones['START']}~${item.timestones['QA']}`}
                            </Text>
                          : null**/
                        }
                        {/* 此处的待办事项，需计算得出 */}
                        <Tasks tasks={item.thingsNeedHandle} />
                        <div className="project-opt-area">
                          <ButtonGroup minimal={true} vertical={false}>
                              <Button text="查看" icon="eye-on" onClick={this.onLookDetailProject.bind(this, item)}/>
                              <Divider />
                              <Button text="编辑" icon="edit" onClick={this.onEditProject.bind(this, item)}/>
                              <Divider />
                              <Button text="删除" icon="remove" onClick={this.onRemoveProject.bind(this, item)}/>
                          </ButtonGroup>
                        </div>
                      </Card>
                    </li>
                  )
          }
        </ul>
        {/* 告警框 */}
        <Alert
          show={showAlert}
          onCancel={this.onCancel.bind(this)}
          onConfirm={this.onConfirm.bind(this)}
        />
      </div>
    );
  }
}
