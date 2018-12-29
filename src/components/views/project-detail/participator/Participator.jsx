/**
 * 项目相关人员
 */

import React from 'react';
import s from './Participator.styl';

export default ({ participators, ...rest }) => (
  <ul className={s.participatorList}>
    {
      (participators || []).map((participator, j) =>
        <li className={s.participatorItem} key={j}>
          <span className={s.participatorItemTitle}>{participator.name}</span>
          ({participator.role})
        </li>
      )
    }
  </ul>
)
