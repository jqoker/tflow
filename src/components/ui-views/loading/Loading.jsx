import React, { Component } from 'react';
import {
  Spinner,
  Text,
} from '@blueprintjs/core';
import './Loading.css';

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
      <div className="loading-icon">
        <Spinner size={Spinner.SIZE_STANDARD} />
        {
          !!loadingText ? <Text ellipsize={true} className="loading-icon-text">{loadingText}</Text> : null
        }
      </div>
    );
  }
}
