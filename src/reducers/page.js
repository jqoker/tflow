import {
  UPDATE_PAGE_STATUS
} from '../actions';
import { PAGE_NAME } from '../constants.js';

// 初始化state
const initialState = {
  name: PAGE_NAME.DETAIL,
  id: 0,
};

export default (state = initialState, { type, payload } = action) => {
  switch (type) {
    case UPDATE_PAGE_STATUS: {
      return { ...state, ...payload };
    }
    default:
      return state;
  }
}
