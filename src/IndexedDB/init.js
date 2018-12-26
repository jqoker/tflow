import Dexie from 'dexie';
import { project } from './store-object.js';
import config from './config.js';

/**
 * 初始化数据库
 */
const initVersion = 1;  // 版本号
export const selfManagerAppDB = new Dexie(config.name);
export const createProjectStore = () => {
  try {
    selfManagerAppDB.version(initVersion).stores({
      projects: Object.keys(project).join(','),
    });
  } catch(e) { console.log(e); }
}
