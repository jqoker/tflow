/**
 * 项目相关人员
 */

import React from 'react';
import UICardHOC from '../../../hoc/UICardHOC.jsx';
import s from './Participator.styl';

@UICardHOC({
  title: '事务相关成员',
})
export default class Participator extends React.Component {
  render() {
    const { participators } = this.props;
    return (
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
  }
}
