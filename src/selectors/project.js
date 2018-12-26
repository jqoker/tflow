/**
 * 项目数据处理中心
 */
import { createSelector } from 'reselect';
const isLoading = state => state.project.isLoading;
const list = state => state.project.list;

// 计算待办事项
const computeThingsNeedToHandle = (project) => {
  const { tasks } = project || {};
  const count = (tasks || []).length;
  let k = 0; // 已完成
  (tasks || []).forEach((task, j) => {
    k += parseInt(task.complete || 0, 10);
  });
  // 待办事项
  return [
    { title: '待处理事项', count: count - k, taskCSSStyle: { color: '#F00'} },
    { title: '未完成事项', count: count - k,  taskCSSStyle: { color: '#F3F'} },
    { title: '已完成事项', count: k, taskCSSStyle: { color: '#00F'} }
  ];
};

// 计算时间节点
/**
 * timestones: {
 *   START, // 起始时间
 *   QA, // 提测时间
 *   UED, // UED时间
 *   END, // 截止时间
 *   RELEASE, // 发布时间
 * }
 */
const computeTimestones = (project) => {
  const { timestones = {} } = project;
  const objt = {};
  (Object.keys(timestones || {})).forEach((key, i) => {
    const timeStr = timestones[key];
    // 无时间节点，赋值undefined，UI层面用于提示展示
    if (timeStr) {
      const time = new Date(timeStr);
      objt[key] = `${time.getFullYear()}.${time.getMonth() + 1}.${time.getDate()}`;
    }
  });
  return objt;
};

// 计算事项优先级
const justifyThingsRank = (project) => {};


export default createSelector(
  isLoading,
  list,
  (isLoading, list) => {
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
    }
  }
);
