import {
  FETCH_PROJECT_LIST,
  FETCH_PROJECT_LIST_SUCCESS,
  FETCH_PROJECT_LIST_FAIL,
  CREATE_PROJECT,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_FAIL,
  DELETE_PROJECT,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_FAIL,
} from '../actions';

// 初始化state
const initialState = {
  isLoading: false,
  list: [],
};

export default (state = initialState, { type, payload } = action) => {
  switch (type) {
    // loading触发
    case FETCH_PROJECT_LIST:
    case CREATE_PROJECT:
    {
      return {
        ...state,
        isLoading: true,
      };
    }
    // 失败
    case FETCH_PROJECT_LIST_FAIL:
    case CREATE_PROJECT_FAIL: {
      return {
        ...state,
        isLoading: false,
      }
    }
    // 查询成功
    case FETCH_PROJECT_LIST_SUCCESS: {
      return {
        ...state,
        list: payload || [],
        isLoading: false,
      }
    }
    // 创建成功
    case CREATE_PROJECT_SUCCESS: {
      return {
        ...state,
        list: [payload, ...state.list],
        isLoading: false,
      };
    }
    // 删除成功
    case DELETE_PROJECT_SUCCESS: {
      const { list } = state;
      return {
        ...state,
        list: list.filter(item => item.id !== payload.id),
        isLoading: false,
      };
    }
    case DELETE_PROJECT_FAIL: {
      return state;
    }
    default:
      return state;
  }
}
