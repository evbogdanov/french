import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Alert from './Alert';

configure({adapter: new Adapter()});

describe('<Alert />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Alert />);
  });

  it('should be a Bootstrap .alert element', () => {
    expect(wrapper.is('.alert')).toBe(true);
  });

  it('should support "success" and "danger" types', () => {
    wrapper.setProps({type: 'success'});
    expect(wrapper.is('.alert-success')).toBe(true);
    wrapper.setProps({type: 'danger'});
    expect(wrapper.is('.alert-danger')).toBe(true);
  });

  it('should render some text', () => {
    wrapper.setProps({text: 'some text'});
    expect(wrapper.text()).toEqual('some text');
  });
});
