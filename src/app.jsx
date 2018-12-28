import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Menu,
  Icon,
  Layout
} from 'antd';
import { withRouter, Route, Link } from "react-router-dom";
import {
  fetchProjectList,
  fetchProjectListSuccess,
  fetchProjectListFail,
} from './actions/index.js';
import ProjectDBHelper from './IndexedDB/helper/ProjectDBHelper.js';
import ProjectList from './components/views/project-list/ProjectList.jsx';
import RootRouter from './router/router.jsx';
import Loading from './components/views/loading/Loading.jsx';
import projectSelector from './selectors/project.js';
import s from './app.styl';

const MENU_KEY = {
  CREATE_PROJECT: 'CREATE_PROJECT',
  PROJECT_SETTINGS: 'PROJECT_SETTINGS',
};

@withRouter
@connect(projectSelector)
export default class App extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.fetchProjects();
  }
  fetchProjects() {
    const { dispatch } = this.props;
    dispatch(fetchProjectList());
    ProjectDBHelper.getInstance().select({
      success: (projects) => {
        dispatch(fetchProjectListSuccess(projects));
      },
      fail: () => {
        dispatch(fetchProjectListFail(e));
      }
    });
  }
  onMenuItemClick(e) {
    const { history } = this.props;
    switch (e.key) {
      case MENU_KEY.CREATE_PROJECT: {
        history.push('/project/create');
        break;
      }
      case MENU_KEY.PROJECT_SETTINGS: {
        break;
      }
      default:
    }
  }
  render() {
    const {
      isLoading = false,
      projects = [],  // 项目列表
    } = this.props;
    return (
      <div className={s.selfManagerPage}>
        <Layout>
          <Layout.Header className={s.selfManagerPageHeader}>
            <Menu
              mode="horizontal"
              onClick={this.onMenuItemClick.bind(this)}
              className={s.selfManagerPageMenu}
            >
              <Menu.Item disabled><Icon type="home" />SELF-MANAGER</Menu.Item>
              <Menu.Item key={MENU_KEY.CREATE_PROJECT}><Icon type="plus-circle" />创建项目</Menu.Item>
              <Menu.Item key={MENU_KEY.PROJECT_SETTINGS}><Icon type="settings" />设置</Menu.Item>
            </Menu>
          </Layout.Header>
          <Layout>
            {
              isLoading ? <Loading isLoading={isLoading} loadingText="努力加载中"/>
              : <div className={s.selfManagerPageContainer}>
                  <Layout.Sider width={330} theme="light" className={s.selfManagerPageContainerSider}>
                    <ProjectList projects={projects} />
                  </Layout.Sider>
                  <Layout.Content><RootRouter /></Layout.Content>
                </div>
            }
          </Layout>
          {
            !!isLoading ? null
            : <Layout.Footer className={s.selfManagerPageFooter}>
              <div>@Copyright hongliang.yu(yuhongliang900@163.com)</div>
            </Layout.Footer>
          }
        </Layout>
      </div>
    )
  }
}
