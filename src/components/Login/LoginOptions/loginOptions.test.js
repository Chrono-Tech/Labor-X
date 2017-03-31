import React from 'react'
import {LoginOptions} from './loginOptions'
import {shallow} from 'enzyme'

it('renders without crashing', () => {
  const wrapper = shallow(<LoginOptions />)
  expect(wrapper).toBeDefined();
})
