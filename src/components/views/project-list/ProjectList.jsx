/**
 * 项目列表
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Card,
  Divider
} from 'antd';
import {
  deleteProject,
  deleteProjectSuccess,
  deleteProjectFail,
  updatePageStatus,
} from '../../../actions/index.js';
import Tasks from './tasks/Tasks.jsx';
import ProjectDBHelper from '../../../IndexedDB/helper/ProjectDBHelper.js';
import Alert from '../../Alert.jsx';
import Toastr from '../../Toastr.js';
import { PAGE_NAME } from '../../../constants.js';
import s from './ProjectList.styl';

@connect()
export default class ProjectList extends Component {
  constructor(props) {
    super(props);
    this.projectToRemove = null;
  }
  componentDidMount() {}
  onDelete(project) {
    this.projectToRemove = project;
    Alert.confirm({
      onOk: () => {
        const { dispatch } = this.props;
        ProjectDBHelper.getInstance()
          .delete(this.projectToRemove, {
            success: () => {
              dispatch(deleteProjectSuccess(this.projectToRemove));
              Toastr.success('删除成功.');
            },
            fail: (e) => {
              dispatch(deleteProjectFail(e));
              Toastr.error('删除失败, 请重试.');
            }
        });
      }
    });
  }
  onDetail(project) {
    //// TODO: project detail
    const { id = 0 } = project;
    const { dispatch } = this.props;
    dispatch(updatePageStatus({ id, name: PAGE_NAME.DETAIL }));
  }
  onEdit(project) {
    //// TODO: project edit
  }
  render() {
    const { onDetail, onEdit, onDelete } = this;
    const { projects = [] } = this.props;

    // if (!projects.length) {
    //   return (
    //     <div className={s.selfManagerProjectsNone}>
    //       暂无项目
    //     </div>
    //   )
    // }
    /**
     * // TODO: 数据处理放置于reselect中
     * 视图层只负责渲染
     */
    return (
      <div className={s.selfManagerProjects}>
        {/* 项目列表 */}
        <ul className={s.selfManagerProjectsContent}>
          {
            (projects || []).map((item, j) =>
              <li key={j} className={s.projectListItem} onClick={onDetail.bind(this, item)}>
                <Card className={s.projectItemContent} title={item.name}>
                  {/* <Text className="project-title" ellipsize={true} tagName="div">{item.name}</Text> */}
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
                  <div className={s.projectItemOpt}>
                    <Button.Group className={s.projectItemOptBtnGroup}>
                      {/* <Button icon="delete" className={s.projectItemOptBtn} onClick={onDelete.bind(this, item)}>删除</Button> */}
                    </Button.Group>
                  </div>
                </Card>
              </li>
            )
          }
        </ul>
      </div>
    );
  }
}
