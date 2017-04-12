import React from 'react'
import {Dashboard} from './dashboard'
import { shallow } from 'enzyme'

it('renders without crashing', () => {
  const wrapper = shallow(<Dashboard />);
  expect(wrapper).toBeDefined();
})
