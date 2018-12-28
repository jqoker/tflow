import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
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
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('self-mananger-application')
);
