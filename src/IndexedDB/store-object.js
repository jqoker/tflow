/**
 * 1. 数据库配置
 * 2. 定义数据库表列值说明
 */

// 数据库配置
export const config = {
  name: 'self-manager-app',
};

// 数据库表列值说明
export const projmodel = {
  '++id': '项目自增ID',
  name: '', // 项目名称
  participators: [
    /**
     * {
     *    name: 姓名
     *    role: 角色
     * }
     */
  ],
  tasks: [
    /**
     * {
     *    title: 名称
     *    tag: 标签
     *    description: 描述
     *    complete: 完成标识
     * }
     */
  ],
  /**
   * 时间节点
   */
  timestones: {
    'START': '开发起始时间',
    'QA': '提测时间',
    'UED': 'UED验收时间',
    'RELEASE': '项目上线时间',
  },
  description: '项目描述',
  progress: '项目进度'
}
