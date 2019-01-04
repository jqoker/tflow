import { Table, Icon } from 'antd';
import React, { Component } from 'react';
import Timestones from './timestones/Timestones.jsx';
import Participator from './participator/Participator.jsx';
import Tasks from './tasks/Tasks.jsx';

const columns = [{
  title: '项目名称',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '项目描述',
  dataIndex: 'description',
  key: 'description',
}, {
  title: '项目进度',
  dataIndex: 'progress',
  key: 'progress',
},{
  title: '操作', dataIndex: '', key: 'x', render: () => <a href="javascript:;">删除</a>,
}];

function CustomExpandIcon(props) {
  return (
    <Icon type="menu-unfold" onClick={e => props.onExpand(props.record, e)} />
  );
}

const renderExpandedRow = record => (
  <div className={{}}>
    <Timestones timestones={record.timestones} />
    <Tasks tasks={record.tasks} />
    <Participator participators={record.participators} />
  </div>
)

export default ({ projects }) => (
  <Table
    title={() => '项目列表'}
    dataSource={projects}
    columns={columns}
    expandedRowRender={renderExpandedRow}
    rowKey={record => record.name}
    pagination={{position: 'top'}}
    expandIcon={CustomExpandIcon}
  />
)
