import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Menu,
  Icon,
  Layout
} from 'antd';
import {
  fetchProjectList,
  fetchProjectListSuccess,
  fetchProjectListFail,
  updatePageStatus,
} from './actions/index.js';
import ProjectDBHelper from './IndexedDB/helper/ProjectDBHelper.js';
import ProjectList from './components/views/project-list/ProjectList.jsx';
import ProjectDetail from './components/views/project-detail/ProjectDetail.jsx';
import CreateProject from './components/inputs/create-project/CreateProject.jsx';
import None from './components/views/none/None.jsx';
import Loading from './components/views/loading/Loading.jsx';
import projectSelector from './selectors/project.js';
import { PAGE_NAME } from './constants.js';
import s from './app.styl';
import ProjectDetailList from './components/views/project-detail/ProjectDetailList.jsx';

const MENU_KEY = {
  CREATE_PROJECT: 'CREATE_PROJECT',
  PROJECT_SETTINGS: 'PROJECT_SETTINGS',
};

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
    const { dispatch } = this.props;
    switch (e.key) {
      case MENU_KEY.CREATE_PROJECT: { dispatch(updatePageStatus({ name: PAGE_NAME.CREATE })); break;}
      case MENU_KEY.PROJECT_SETTINGS: { break; }
      default:
    }
  }
  onGoToCreateProject() {
    const { dispatch } = this.props;
    dispatch(updatePageStatus({ name: PAGE_NAME.CREATE }));
  }
  dispatchContent() {
    const { page = {}, projects } = this.props;
    const { name, id } = page;
    return (
      (name === PAGE_NAME.DETAIL) ?
      !!projects.length ? <ProjectDetail id={id} /> : <None onGoToCreateProject={this.onGoToCreateProject.bind(this)}/>
      : <CreateProject />
    );
  }
  render() {
    const {
      isLoading = false,
      projects = [],  // 项目列表
      page = {},
    } = this.props;
    const { name, id } = page;
    return (
      <div className={s.selfManagerPage}>
        <Layout>
          <Layout.Sider width={330} theme="light" className={s.selfManagerPageContainerSider}>
            <ProjectList projects={projects} />
          </Layout.Sider>
          <Layout>
            {/*
              <Layout.Header className={s.selfManagerPageHeader}>
                <div className={s.selfManagerLogo}>
                  项目管家
                  <p className={s.selfManagerLogan}>
                    更简单、更高效
                  </p>
                </div>
                <Menu
                  mode="horizontal"
                  onClick={this.onMenuItemClick.bind(this)}
                  className={s.selfManagerPageMenu}
                >
                  <Menu.Item key={MENU_KEY.CREATE_PROJECT}><Icon type="plus-circle" />创建项目</Menu.Item>
                  <Menu.Item key={MENU_KEY.PROJECT_SETTINGS}><Icon type="settings" />设置</Menu.Item>
                </Menu>
              </Layout.Header>
            */}
              {
                isLoading ? <Loading isLoading={isLoading} loadingText="努力加载中"/>
                : <div className={s.selfManagerPageContainer}>
                    {/*
                      <Layout.Sider width={330} theme="light" className={s.selfManagerPageContainerSider}>
                        <ProjectList projects={projects} />
                      </Layout.Sider>
                    */}
                    <Layout.Content><ProjectDetailList projects={projects}/>{/*this.dispatchContent()*/}</Layout.Content>
                  </div>
              }
          </Layout>
          {
            !isLoading ? null
            : <Layout.Footer className={s.selfManagerPageFooter}>
              <div>@Copyright hongliang.yu(yuhongliang900@163.com)</div>
            </Layout.Footer>
          }
        </Layout>
      </div>
    )
  }
}
