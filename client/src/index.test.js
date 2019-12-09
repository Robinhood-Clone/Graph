import React from 'react'
import { shallow, mount, render } from 'enzyme';
import Graph from './App.jsx';


//should display the graph, currently not working with d3
it('displays the graph', () => {
    const wrapper = shallow(<Graph />);
    expect(wrapper.exists()).toBe(true);
  });

//test if all the data is there

//test if correct axes and start/endpoints for data are there

//test if moving cursor over graph renders number properly


