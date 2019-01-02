/**
 * 关键时间节点
 */
import React from 'react';
import { Steps, Popover } from 'antd';
import classnames from 'classnames';
import UICardHOC from '../../../hoc/UICardHOC.jsx';
import { projmodel } from '../../../../IndexedDB/store-object.js';
import s from './Timestones.styl';

// 浮层提示
const titles = Object.keys(projmodel.timestones).map(key => projmodel.timestones[key]);
const dotStatus = { 'finish': '已完成', 'process': '进行中', 'wait': '未完成', };
const dotStatusTip = (dot, { status, index }) => (
  <Popover content={
    <p className={s.dotStatus}>
      <span className={s.dotStatusPhase}>阶段: {titles[index]}</span>
      状态:<span className={classnames(s.dotStatusColor, s[status])}>{dotStatus[status]}</span>
    </p>
  }>
    {dot}
  </Popover>
);

export default UICardHOC({ title: '关键时间节点', isEdit: true })(({ timestones, ...rest }) => (
  <Steps current={timestones.stage} progressDot={dotStatusTip}>
    {
      (timestones.list || []).map((time, i) =>
        <Steps.Step
          key={i}
          title={time.title}
          description={time.description}
        />
      )
    }
  </Steps>
));
