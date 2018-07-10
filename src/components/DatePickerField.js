import React from 'react'
import moment from 'moment/moment'
import DatePicker from 'material-ui-pickers/DatePicker'

export default ({ input: { value, onChange }, ...props }) => <DatePicker
  {...props}
  value={value ? moment(value) : null}
  onChange={d => onChange(d.toDate())}
  style={{width: '230px'}}
/>
