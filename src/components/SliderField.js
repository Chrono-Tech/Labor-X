import React from 'react'
import Slider from '@material-ui/lab/Slider';

export default ({ input: { value, onChange }, ...props }) => <Slider
  {...props}
  value={value}
  onChange={(e, value) => onChange(Math.round(value))}
/>
