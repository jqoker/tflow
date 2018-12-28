/**
 * 路由管理
 */
import React, { Component } from 'react';
import { Route } from "react-router-dom";
import CreateProject from '../components/inputs/create-project/CreateProject.jsx';
import ProjectDetail from '../components/views/project-detail/ProjectDetail.jsx';
import s from '../app.styl';

export default class RootRouter extends Component {
  render() {
    return (
      <div className={s.selfManagerPageRouter}>
        <Route path="/" exact component={ProjectDetail} />
        <Route path="/project/create" component={CreateProject} />
        <Route path="/project/detail/:id" component={ProjectDetail} />
      </div>
    );
  }
}
