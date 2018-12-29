import { combineReducers } from 'redux';
import page  from './page.js';
import project from './project.js';

export default combineReducers({
  page,
  project,
});
