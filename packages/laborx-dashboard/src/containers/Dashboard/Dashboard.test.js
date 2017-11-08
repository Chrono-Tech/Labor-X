import React from 'react'
import { shallow } from 'enzyme'
import Dashboard from '../Dashboard'

describe('Dashboard', () => {
  it('should render normal without any props supplied', () => {
    expect(shallow(<Dashboard />)).toHaveLength(1)
  })
  it('should render normal with children content', () => {
    expect(shallow(<Dashboard>Dashboard</Dashboard>).text()).toEqual('Dashboard')
  })
})
