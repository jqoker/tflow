/**
 * Toastr
 */
import { message } from 'antd';

const TIMEOUT = 3; // 3s
const Toastr = {};
[
  'success',
  'error',
  'info',
  'warning',
  'warn',
  'loading'
].forEach(method => {
  Toastr[method] = (title) => {
    message[method](title, TIMEOUT);
  }
});
export default Toastr;
