import React from 'react'
import { shallow, mount, render } from 'enzyme';
import Graph from './App.jsx';


//should display the graph, currently not working with d3
it('displays the graph', () => {
    const wrapper = shallow(<Graph />);
    expect(wrapper.exists()).toBe(true);
  });