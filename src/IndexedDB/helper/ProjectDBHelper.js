/**
 * 项目数据操作类
 */
import BaseDBHelper from './BaseDBHelper.js';

// 默认配置项参数
const defaultOptions = {
  success: () => {},
  fail: () => {}
};

export default class ProjectDBHelper extends BaseDBHelper {
  constructor() {
    super();
  }
  // 查询
  select(options = {}) {
    const { dbAgent, applicationDB } = this;
    const { success, fail } = { ...defaultOptions, ...options };
    dbAgent.spawn(function*() {
      try {
        const projects = yield applicationDB.project.reverse().toArray();
        success(projects);
      } catch(e) {
        fail(e);
      }
    });
  }
  // 插入
  insert(project, options = {}) {
    const { dbAgent, applicationDB } = this;
    const { success, fail } = { ...defaultOptions, ...options };
    dbAgent.spawn(function*() {
      try {
        yield applicationDB.project.add(project);
        success(project);
      } catch(e) {
        fail(e);
      }
    });
  }
  // 删除
  delete(project, options = {}) {
    const { dbAgent, applicationDB } = this;
    const { id } = project || {};
    const { success, fail } = { ...defaultOptions, ...options };
    dbAgent.spawn(function*() {
      try {
        yield applicationDB.project.delete(id);
        success(project);
      } catch(e) {
        fail(e);
      }
    });
  }
}

ProjectDBHelper.getInstance = (() => {
  let instance = null;
  return () => {
    if (instance === null) {
      instance = new ProjectDBHelper();
    }
    return instance;
  }
})();
