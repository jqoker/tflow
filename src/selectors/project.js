/**
 * 项目数据处理中心
 */
import { createSelector } from 'reselect';
import { computeThingsNeedToHandle, computeTimestones } from './helper.js';
const isLoading = state => state.project.isLoading;
const list = state => state.project.list;
const page = state => state.page;

export default createSelector(
  isLoading,
  list,
  page,
  (isLoading, list, page) => {
    const projects = [];
    list = (list || []).filter(item => item && !!item.name);
    list.forEach(project => {
      const thingsNeedHandle = computeThingsNeedToHandle(project);
      const timestones = computeTimestones(project);
      projects.push({
        ...project,
        thingsNeedHandle,
        timestones,
      });
    });
    return {
      isLoading,
      projects,
      page,
    };
  }
);
