/**
 * 任务表单(列表)
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import {
  Form,
  Field,
  ArrayComponent,
  ObjectComponent,
  ParentFieldNameContext,
} from 'simple-react-form';
import s from './MultiFields.styl';

const propTypes = {
  ...ArrayComponent.propTypes,
  ...ObjectComponent.propTypes,
  showDeleteButton: PropTypes.bool,
  showAddButton: PropTypes.bool,
  deleteBtnTitle: PropTypes.string,
  addBtnTitle: PropTypes.string,
}
const defaultProps = {
  ...ArrayComponent.defaultProps,
  showDeleteButton: true,
  showAddButton: true,
  autoAddItem: true,
  deleteBtnTitle: '删除当前项',
  addBtnTitle: '继续添加'
}

class ItemComponent extends ObjectComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={s.inputFieldsItem}>
        <div className={s.inputFieldsContent}>
          { this.getChildrenComponents() }
        </div>
      </div>
    )
  }
}

export default class MultiFields extends ArrayComponent {
  constructor(props) {
    super(props);
  }
  renderChildrenItem({ index, children }) {
    const {
      fieldName,
    } = this.props;
    return (
      <div
        className={s.inputFieldsList}
        key={`${fieldName}.${index}`}
      >
        { this.renderChildrenItemWithContext({ index, children }) }
      </div>
    )
  }
  renderChildrenItemWithContext({ index, children }) {
    const {
      fieldName,
      showDeleteButton,
      deleteBtnTitle,
    } = this.props;
    return (
      <ParentFieldNameContext.Provider
        key={index}
        value={fieldName}
      >
        <Field fieldName={`${index}`} type={ItemComponent}>
          { children }
          { showDeleteButton
            ? this.renderButton('delete')(
              () => this.removeItem(index),
              deleteBtnTitle,
              s.deleteButton
            )
            : null
          }
        </Field>
      </ParentFieldNameContext.Provider>
    )
  }
  renderButton(type) {
    const buttonType = (type === 'delete' ? 'danger' : 'primary');
    const iconType = (type === 'delete' ? 'delete' : 'plus-circle');
    return (onClick, label, className) => {
      return (
        <Button
          type={buttonType}
          icon={iconType}
          onClick={onClick}
          className={className}
        >{label}</Button>
      );
    };
  }
  render() {
    const {
      showAddButton,
      addBtnTitle,
    } = this.props;
    return (
      <div className={s.inputFieldsContainer}>
        { this.renderChildren() }
        { showAddButton
          ? this.renderButton('add')(() => this.addItem(), addBtnTitle, s.addButton)
          : null }
      </div>
    )
  }
}

MultiFields.propTypes = propTypes;
MultiFields.defaultProps = defaultProps;
