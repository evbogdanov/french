import React from 'react';
import { connect } from 'react-redux';
import Heading from '../Heading/Heading';
import Secret from '../Secret/Secret';
import NewWord from '../NewWord/NewWord';
import NewPhrase from '../NewPhrase/NewPhrase';
import * as actions from '../../store/actions';

const Admin = (props) => {
  let [user, newWord, newPhrase] = ['guest', null, null];
  if (props.isAuthenticated) {
    user = 'admin';
    newWord = <NewWord />;
    newPhrase = <NewPhrase />;
  }

  return (
    <>
      <Heading>Hello, {user}</Heading>
      <Secret setAuthenticated={props.setAuthenticated}
              unsetAuthenticated={props.unsetAuthenticated} />
      {newWord}
      {newPhrase}
    </>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.isAuthenticated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setAuthenticated: () => dispatch({type: actions.SET_AUTHENTICATED}),
    unsetAuthenticated: () => dispatch({type: actions.UNSET_AUTHENTICATED})
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {pure: false}
)(Admin);
