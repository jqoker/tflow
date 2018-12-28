import React, { Component } from 'react';
import { Spin } from 'antd';
import s from './Loading.styl';

export default class Loading extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { isLoading, loadingText } = this.props;
    if (!isLoading) {
      return null;
    }
    return (
      <div className={s.loadingIcon}>
        <Spin tip={loadingText}></Spin>
      </div>
    );
  }
}
