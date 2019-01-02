/**
 * Card高级
 */
import React, { Component } from 'react';
import { Icon, Card, Modal } from 'antd';
import s from './UICardHOC.styl';

export default (options = {
  title: '',
  isEdit: false,
}) => (WrappedComponent) => (
  class WrapperComponent extends Component {
    constructor(props) {
      super(props);
      this.state = { visible: false };
    }
    render() {
      const { isModalUI = false, title, children } = this.props;
      const { visible } = this.state;
      if (isModalUI) {
        return <WrappedComponent {...this.props} />
      }
      return (
        <Card className={s.uiCardWrapper} title={options.title}>
          <WrappedComponent {...this.props} />
          { options.isEdit ?
            <div className={s.uiCardWrapperEdit}>
              <Icon type="edit" className={s.uiCardWrapperEditBtn} onClick={() => this.setState({visible:true})} theme="twoTone"/>
              <Modal title={title} width="1020px" visible={visible} onOk={this.props.onSubmitEdit} onCancel={() => this.setState({visible:false})}>{children}</Modal>
            </div>
            : null
          }
        </Card>
      )
    }
  }
)
