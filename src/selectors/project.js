/**
 * 项目数据处理中心
 */
import { createSelector } from 'reselect';
import { computeProgress, computeTimestones } from './helper.js';
const isLoading = state => state.project.isLoading;
const list = state => state.project.list;

export default createSelector(
  isLoading,
  list,
  (isLoading, list) => {
    const projects = [];
    list = (list || []).filter(item => item && !!item.name);
    list.forEach(project => {
      const { percent, thingsNeedToHandle } = computeProgress(project);
      const timestones = computeTimestones(project);
      projects.push({
        ...project,
        percent,
        thingsNeedToHandle,
        timestones,
      });
    });
    return {
      isLoading,
      projects,
    };
  }
);
