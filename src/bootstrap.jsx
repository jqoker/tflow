import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import 'normalize.css';
import { createProjectStore } from './IndexedDB/init.js';
import store from './store';
import App from './app.jsx';

/**
 * 初始化数据库
 */
createProjectStore();


/**
 * 渲染DOM
 */
ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('self-mananger-application')
);
