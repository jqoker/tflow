/**
 * action定义集
 */

import { createAction } from 'redux-actions';
/**
 * 项目列表
 */
export const FETCH_PROJECT_LIST = 'FETCH_PROJECT_LIST';
export const FETCH_PROJECT_LIST_SUCCESS = 'FETCH_PROJECT_LIST_SUCCESS';
export const FETCH_PROJECT_LIST_FAIL = 'FETCH_PROJECT_LIST_FAIL';

export const fetchProjectList = createAction(FETCH_PROJECT_LIST);
export const fetchProjectListSuccess = createAction(FETCH_PROJECT_LIST_SUCCESS);
export const fetchProjectListFail = createAction(FETCH_PROJECT_LIST_FAIL);

/**
 * 添加项目
 */
export const CREATE_PROJECT = 'CREATE_PROJECT';
export const CREATE_PROJECT_SUCCESS = 'CREATE_PROJECT_SUCCESS';
export const CREATE_PROJECT_FAIL = 'CREATE_PROJECT_FAIL';

export const createProject = createAction(CREATE_PROJECT);
export const createProjectSuccess = createAction(CREATE_PROJECT_SUCCESS);
export const createProjectFail = createAction(CREATE_PROJECT_FAIL);

/**
 * 删除项目
 */
export const DELETE_PROJECT = 'DELETE_PROJECT';
export const DELETE_PROJECT_SUCCESS = 'DELETE_PROJECT_SUCCESS';
export const DELETE_PROJECT_FAIL = 'DELETE_PROJECT_FAIL';

export const deleteProject = createAction(DELETE_PROJECT);
export const deleteProjectSuccess = createAction(DELETE_PROJECT_SUCCESS);
export const deleteProjectFail = createAction(DELETE_PROJECT_FAIL);

/**
 * 编辑项目
 */
export const EDIT_PROJECT = 'EDIT_PROJECT';
export const EDIT_PROJECT_SUCCESS = 'EDIT_PROJECT_SUCCESS';
export const EDIT_PROJECT_FAIL = 'EDIT_PROJECT_FAIL';

export const editProject = createAction(EDIT_PROJECT);
export const editProjectSuccess = createAction(EDIT_PROJECT_SUCCESS);
export const editProjectFail = createAction(EDIT_PROJECT_FAIL);
