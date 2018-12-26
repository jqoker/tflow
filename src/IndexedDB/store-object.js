/**
 * 定义数据库表列值说明
 */

export const project = {
  '++id': '项目自增id',
  name: '项目名称',
  owners: [
    { 'RD': '开发人员' },
    { 'QA': '测试人员' },
    { 'PM': '产品' }
  ],
  tasks: [
    {
      'title': '任务名称',
      'tag': '类型(颜色值标识)',
      'description': '任务描述',
      'complete': '是否完成'
    }
  ],
  startTime: '起始时间',
  endTime: '截止时间',
  processing: '项目进度',
};
