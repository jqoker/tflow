/**
 * Card高级
 */
import React, { Component } from 'react';
import { Card } from 'antd';
import s from './UICardHOC.styl';

export default (options = {
  title: ''
}) => (WrappedComponent) => (
  class WrapperComponent extends Component {
    constructor(props) {
      super(props);
    }
    render() {
      return (
        <Card className={s.uiCardWrapper} title={options.title}>
          <WrappedComponent {...this.props} />
        </Card>
      )
    }
  }
)
