import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Alert from './Alert';

configure({adapter: new Adapter()});

describe('<Alert />', () => {
  it('should be a Bootstrap .alert element', () => {
    const wrapper = shallow(<Alert />);
    expect(wrapper.is('.alert')).toBe(true);
  });

  it('should support "success" type', () => {
    const wrapper = shallow(<Alert type="success" />);
    expect(wrapper.is('.alert-success')).toBe(true);
  });

  it('should support "danger" type', () => {
    const wrapper = shallow(<Alert type="danger" />);
    expect(wrapper.is('.alert-danger')).toBe(true);
  });

  it('should render some text', () => {
    const wrapper = shallow(<Alert text="some text" />);
    expect(wrapper.text()).toEqual('some text');
  });
});
