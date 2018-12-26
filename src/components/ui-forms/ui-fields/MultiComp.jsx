/**
 * 任务表单(列表)
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Text } from '@blueprintjs/core';
import {
  Form,
  Field,
  ArrayComponent,
  ObjectComponent,
  ParentFieldNameContext,
} from 'simple-react-form';
import './MultiComp.css';

const propTypes = {
  ...ArrayComponent.propTypes,
  ...ObjectComponent.propTypes,
  showRemoveButton: PropTypes.bool,
  showAddButton: PropTypes.bool,
  removeLabel: PropTypes.string,
  addLabel: PropTypes.string,
}
const defaultProps = {
  ...ArrayComponent.defaultProps,
  showRemoveButton: true,
  showAddButton: true,
  autoAddItem: true,
  removeLabel: '删除当前项',
  addLabel: '继续添加'
}

class ItemComponent extends ObjectComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="project-item">
        <div className="project-item-content">
          { this.getChildrenComponents() }
        </div>
      </div>
    )
  }
}

export default class MultiComp extends ArrayComponent {
  constructor(props) {
    super(props);
  }
  renderChildrenItem({ index, children }) {
    const {
      fieldName,
      showRemoveButton,
      removeLabel,
    } = this.props;
    return (
      <div
        className="project-list"
        key={`${fieldName}.${index}`}
      >
        { this.renderChildrenItemWithContext({ index, children }) }
      </div>
    )
  }
  renderChildrenItemWithContext({ index, children }) {
    const {
      fieldName,
      showRemoveButton,
      removeLabel,
    } = this.props;
    return (
      <ParentFieldNameContext.Provider
        key={index}
        value={fieldName}
      >
        <Field fieldName={`${index}`} type={ItemComponent}>
          { children }
          { showRemoveButton
            ? this.renderButton('remove')(
              () => this.removeItem(index),
              removeLabel,
              'remove-button'
            )
            : null }
        </Field>
      </ParentFieldNameContext.Provider>
    )
  }
  renderButton(type) {
    const intent = (type === 'remove' ? 'danger' : 'none');
    return (onClick, label, className) => {
      return (
        <Button
          text={label}
          icon={type}
          intent={intent}
          className={className}
          onClick={onClick}
        />
      );
    };
  }
  render() {
    const {
      showAddButton,
      addLabel,
      label,
    } = this.props;
    return (
      <div className="project-list-container">
        <Text ellipsize={true} className="project-list-container-title">{label}</Text>
        { this.renderChildren() }
        { showAddButton
          ? this.renderButton('add')(() => this.addItem(), addLabel, 'add-button')
          : null }
      </div>
    )
  }
}

MultiComp.propTypes = propTypes;
MultiComp.defaultProps = defaultProps;
