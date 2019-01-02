/**
 * 数据库操作基类
 */
import Dexie from 'dexie';
import { applicationDB } from '../init.js';

export default class BaseDBHelper {
  constructor() {
    this.applicationDB = applicationDB;
    this.dbAgent = Dexie;
  }

  /**
   * 查询
   */
  select() {}

  /**
   * 更新
   */
  update() {}

  /**
   * 插入
   */
  insert() {}

  /**
   * 删除
   */
  delete() {}
}
