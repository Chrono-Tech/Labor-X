import React from 'react';
import {AddressSelect} from './addressSelect';
import {shallow} from 'enzyme';

it('renders without crashing', () => {
    const wrapper = shallow(<AddressSelect />);
});
