/**
 * 路由管理
 */
import React, { Component } from 'react';
import { Route } from "react-router-dom";
import ProjectCreate from '../components/ui-forms/ProjectCreate.jsx';
import ProjectDetail from '../components/ui-views/project-detail/ProjectDetail.jsx';

export default class RootRouter extends Component {
  render() {
    return (
      <div className="self-manager-main-router">
        <Route path="/" exact component={ProjectDetail} />
        <Route path="/project/create" component={ProjectCreate} />
        <Route path="/project/detail/:id" component={ProjectDetail} />
      </div>
    );
  }
}
