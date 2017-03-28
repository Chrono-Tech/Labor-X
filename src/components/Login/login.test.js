import React from 'react';
import {Login} from './login';
import {shallow} from 'enzyme';

it('renders without crashing', () => {
    const wrapper = shallow(<Login />);
});
