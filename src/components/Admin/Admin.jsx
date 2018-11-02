import React from 'react';
import Heading from '../Heading/Heading';
import Secret from '../Secret/Secret';
import * as api from '../../api';

const Admin = (props) => {
  const user = api.isAuthenticated() ? 'admin' : 'guest';

  return (
    <>
      <Heading>Admin</Heading>
      <p>Hello, {user}!</p>
      <Secret />
    </>
  );
};

export default Admin;
