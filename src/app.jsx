import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Card,
  Elevation,
  Navbar,
  NavbarGroup,
  NavbarDivider,
  NavbarHeading,
  Classes,
  Alignment,
  Button,
  Spinner,
  Icon,
} from '@blueprintjs/core';
import { withRouter, Route, Link } from "react-router-dom";
import {
  fetchProjectList,
  fetchProjectListSuccess,
  fetchProjectListFail,
} from './actions/index.js';
import ProjectDBHelper from './IndexedDB/helper/ProjectDBHelper.js';
import ProjectList from './components/ui-views/project-list/ProjectList.jsx';
import RootRouter from './router/router.jsx';
import Loading from './components/ui-views/loading/Loading.jsx';
import projectSelector from './selectors/project.js';
import './app.css';

@withRouter
@connect(projectSelector)
export default class App extends Component {
  constructor(props) {
    super(props);
    this.onClickCreateProject = this.onClickCreateProject.bind(this);
    this.onClickDetailProject = this.onClickDetailProject.bind(this);
  }
  componentDidMount() {
    this.startFetchProjects();
  }
  startFetchProjects() {
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
  onClickCreateProject() {
    const { history } = this.props;
    history.push('/project/create');
  }
  onClickDetailProject() {
    const { history } = this.props;
    history.push('/project/detail');
  }
  render() {
    const {
      isLoading = false,
      projects = [],  // 项目列表
    } = this.props;
    return (
      <div className="self-manager-page" onClick={this.handleAddProject}>
        <Navbar fixedToTop={true}>
            <NavbarGroup align={Alignment.LEFT}>
                <NavbarHeading className="self-manager-page-title">SELF-MANAGER</NavbarHeading>
                <Button className={Classes.MINIMAL} icon="home" text="管理主页" />
                <NavbarDivider />
                <Button className={Classes.MINIMAL} icon="add" text="创建项目" onClick={this.onClickCreateProject}/>
                <NavbarDivider />
                <Button className={Classes.MINIMAL} icon="list-detail-view" text="项目详情" onClick={this.onClickDetailProject}/>
            </NavbarGroup>
        </Navbar>
        {
          isLoading ?
          <Loading isLoading={isLoading} loadingText="努力加载中"/>
          : <div className="self-manager-container">
              <ProjectList projects={projects} />
              <RootRouter />
            </div>
        }
      </div>
    )
  }
}
