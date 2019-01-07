/**
 * 创建项目辅助类
 */
import { projmodel } from '../IndexedDB/store-object.js';

// 计算进度
export const computeProgress = (project) => {
  const { tasks } = project || {};
  const count = (tasks || []).length;
  let k = 0; // 已完成
  (tasks || []).forEach((task, j) => {
    task.complete = 0;  // 创建任务的时候，标记为未完成
    k += parseInt(task.complete || 0, 10);
  });
  const percent = (count === 0 ? '100%' : `${(100 * k / count)}%`);
  // 待办事项
  return {
    percent,
    thingsNeedToHandle: [
      { title: '待处理事项', count: count - k, taskCSSStyle: { color: '#F00'} },
      { title: '未完成事项', count: count - k,  taskCSSStyle: { color: '#F3F'} },
      { title: '已完成事项', count: k, taskCSSStyle: { color: '#00F'} }
    ]
  };
};

// 计算时间节点
/**
 * 需先固序处理，再判断当前时间节点所处阶段
 * timestones: {
 *   START, // 起始时间
 *   QA, // 提测时间
 *   UED, // UED时间
 *   RELEASE, // 发布时间
 * }
 *
 */
export const computeTimestones = (project) => {
  const { timestones = {} } = project;
  const orderedTimestones = {};
  const list = [];
  const now = Date.now();
  let stage = 0;
  // 固序
  [
    'START',
    'QA',
    'UED',
    'RELEASE'
  ].forEach(item => orderedTimestones[item] = timestones[item]);
  Object.keys(orderedTimestones).forEach((key, i) => {
    const timeStr = orderedTimestones[key];
    // 无时间节点，赋值undefined，UI层面用于提示展示
    let timestone = {};
    if (timeStr) {
      const time = new Date(timeStr);
      timestone = {
        title: timeStr,
        description: projmodel.timestones[key],
        tag: key,
      };
      if (now > +time) stage++;
    }
    list.push(timestone);
  });
  return { stage, list };
};
