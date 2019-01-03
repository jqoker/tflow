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
const dotStatus = { 'finish': '过去时间节点', 'process': '当前时间节点', 'wait': '未来时间节点', };
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

export default UICardHOC({ title: '关键时间节点' })(({ timestones, ...rest }) => (
  <Steps current={timestones.stage} progressDot={dotStatusTip} className={s.timestonesSteps}>
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
