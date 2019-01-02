/**
 * 弹框
 */
import { Modal, Button } from 'antd';

const defaultOptions = {
  title: '删除后数据不可恢复，确定要删除吗？',
  content: '',
  icon: 'question-circle',
  onOk: () => {},
  onCancel: () => {},
};

const Alert = {};
[
  'success',
  'error',
  'warning',
  'info',
  'confirm'
].forEach(method => {
  Alert[method] = (options) => Modal[method]({ ...defaultOptions, ...options });
});
export default Alert;
