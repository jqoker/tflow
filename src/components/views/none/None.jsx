/**
 * 无任何项目
 */

import React from 'react';
import s from './None.styl';

export default ({ onGoToCreateProject, ...rest }) => (
  <div className={s.noneProjectContainer}>
    你还没有创建任何项目哦，<span className={s.gotoCreate} onClick={e => onGoToCreateProject(e)}>快去创建吧</span>
  </div>
)
