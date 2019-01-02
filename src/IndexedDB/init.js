import Dexie from 'dexie';
import { config, projmodel } from './store-object.js';

/**
 * 初始化数据库
 */
const initVersion = 1;  // 版本号
export const applicationDB = new Dexie(config.name);
export const createProjectStore = () => {
  try {
    applicationDB.version(initVersion).stores({
      project: Object.keys(projmodel).join(','),
    });
  } catch(e) { console.log(e); }
}
