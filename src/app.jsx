import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Menu,
  Icon,
  Layout,
  Tabs,
} from 'antd';
import {
  fetchProjectList,
  fetchProjectListSuccess,
  fetchProjectListFail,
} from './actions/index.js';
import ProjectDBHelper from './IndexedDB/helper/ProjectDBHelper.js';
import ProjectDetail from './components/views/project-detail/ProjectDetail.jsx';
import CreateProject from './components/inputs/create-project/CreateProject.jsx';
import None from './components/views/none/None.jsx';
import Loading from './components/views/loading/Loading.jsx';
import projectSelector from './selectors/project.js';
import s from './app.styl';

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
  render() {
    const {
      isLoading = false,
      projects = [],  // 项目列表
      page = {},
    } = this.props;
    const { name, id } = page;
    return (
      <div className={s.selfManagerPage}>
        <Layout className={s.selfManagerPageLayout}>
          <Layout.Header className={s.selfManagerPageHeaderLayout}></Layout.Header>
          <Layout.Content className={s.selfManagerPageLayout}>
            {
              isLoading ? <Loading isLoading={isLoading} loadingText="努力加载中"/>
              : <div className={s.selfManagerPageContainer}>
                    <Tabs defaultActiveKey="１" tabPosition="left" size="large" className={s.selfManagerPageContainerTabs}>
                      <Tabs.TabPane tab={<span><Icon type="project" />待办事务</span>} key="１"><ProjectDetail projects={projects}/></Tabs.TabPane>
                      <Tabs.TabPane tab={<span><Icon type="calendar" />我的日历</span>} key="２">开发中</Tabs.TabPane>
                      <Tabs.TabPane tab={<span><Icon type="plus-square" />新建事务</span>} key="３"><CreateProject /></Tabs.TabPane>
                    </Tabs>
                </div>
            }
          </Layout.Content>
        </Layout>
      </div>
    )
  }
}
