import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Header } from './Header'; // test without Redux
import { NavLink } from 'react-router-dom';

configure({adapter: new Adapter()});

const COUNT_GUEST_LINKS = 4, // Logo, Phrases, Words, About
      COUNT_ADMIN_LINKS = COUNT_GUEST_LINKS + 1;

describe('<Header />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Header />);
  });

  it('should not render admin link if user is not authenticated', () => {
    expect(wrapper.find(NavLink)).toHaveLength(COUNT_GUEST_LINKS);
  });

  it('should render admin link if user is authenticated', () => {
    wrapper.setProps({isAuthenticated: true});
    expect(wrapper.find(NavLink)).toHaveLength(COUNT_ADMIN_LINKS);
  });
});
