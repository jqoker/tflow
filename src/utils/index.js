/**
 * 常用工具
 */

/**
 * 对象数组去重
 * @param  {[type]} array [数组]
 * @param  {[type]} key   [数组中对象的唯一key标识]
 * @return {[type]}       [去重后的对象数组]
 */
export const OBJECT_UNIQUE_KEY = {
  'ID': 'id',
  'NAME': 'name',
  'TITLE': 'title',
};
export const uniqueObjectArray = (array, key) => {
  let result = {};
  let resultArray = [];
  (array || []).forEach((item, i) => result[item[key]] = item);
  for (key in result) {
    resultArray.push(result[key]);
  }
  return resultArray;
};
