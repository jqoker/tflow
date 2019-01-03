/**
 * 日期选择器
 */
import React, { Component } from 'react'
import { DatePicker } from 'antd';
import moment from 'moment';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import s from './DatePicker.styl';

export default ({ onChange, label }) => (
  <div className={s.datepickerContainer}>
    {/*<label className={s.datepickerLabel}>{label}(必填项)</label>*/}
    <DatePicker
      locale={locale}
      placeholder="请选择日期"
      onChange={(date, dateString) => onChange(date ? date.format('YYYY.MM.DD') : null, dateString)}
    />
  </div>
)
