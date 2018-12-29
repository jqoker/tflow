import Dexie from 'dexie';
import { config, projmodel } from './store-object.js';

/**
 * 初始化数据库
 */
const initVersion = 1;  // 版本号
export const selfManagerAppDB = new Dexie(config.name);
export const createProjectStore = () => {
  try {
    selfManagerAppDB.version(initVersion).stores({
      projects: Object.keys(projmodel).join(','),
    });
  } catch(e) { console.log(e); }
}
