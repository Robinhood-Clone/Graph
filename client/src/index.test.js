import { shallow, mount, render } from 'enzyme';

// const wrapper = shallow(<Foo />);

let sum = (a,b) => a+b;

test('testing add function', () => {
    expect(sum(1,2)).toBe(3);
})