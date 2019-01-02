import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'normalize.css';
import { createProjectStore } from './IndexedDB/init.js';
import store from './store';
import App from './app.jsx';

moment.locale('zh-cn');

/**
 * 初始化数据库
 */
createProjectStore();


/**
 * 渲染DOM
 */
ReactDom.render(
  <Provider store={store}>
    <LocaleProvider locale={zh_CN}>
      <App />
    </LocaleProvider>
  </Provider>,
  document.getElementById('self-mananger-application')
);
