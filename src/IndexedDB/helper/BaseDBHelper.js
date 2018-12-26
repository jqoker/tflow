/**
 * 数据库操作基类
 */
import Dexie from 'dexie';
import store from '../../store';
import { selfManagerAppDB } from '../init.js';

export default class BaseDBHelper {
  constructor() {
    this.store = store;
    this.selfManagerAppDB = selfManagerAppDB;
    this.dbProxy = Dexie;
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
