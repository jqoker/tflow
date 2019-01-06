import { Table, Icon, Button } from 'antd';
import React, { Component } from 'react';
import Title from './Title.jsx';
import Timestones from './timestones/Timestones.jsx';
import Participator from './participator/Participator.jsx';
import Tasks from './tasks/Tasks.jsx';
import s from './ProjectDetail.styl';

const columns = [{
  title: '项目名称',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '项目描述',
  dataIndex: 'description',
  key: 'description',
  className: s.projectDetailDescriptionCell
}, {
  title: '项目进度',
  dataIndex: 'percent',
  key: 'progress',
},{
  title: '操作', dataIndex: '', key: 'x', render: () => <a href="javascript:;">删除</a>,
}];

// 表头
const HeaderTitle = () => {
  return (
    <div className={{}}>
      <Button type="primary" icon="plus-circle">新建项目</Button>
    </div>
  )
}

// 自定义图标
function CustomExpandIcon(props) {
  const { expanded } = props;
  return (
    <Icon
      type={expanded ? 'caret-up' : 'caret-down'}
      onClick={e => props.onExpand(props.record, e)}
      className={s.expandIcon}
    />
  );
}

const renderExpandedRow = record => (
  <div className={{}}>
    <Title name={record.name} />
    <Timestones timestones={record.timestones} />
    <Tasks tasks={record.tasks} />
    <Participator participators={record.participators} />
  </div>
)

export default ({ projects }) => (
  <Table
    dataSource={projects}
    columns={columns}
    expandedRowRender={renderExpandedRow}
    rowKey={record => record.name}
    pagination={{position: 'top'}}
    expandIcon={CustomExpandIcon}
  />
)
