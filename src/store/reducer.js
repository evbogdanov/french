import * as api from '../api';
import * as actions from './actions';

const initialState = {
  isAuthenticated: api.isAuthenticated()
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case actions.SET_AUTHENTICATED:
    return {
      ...state,
      isAuthenticated: true
    };

  case actions.UNSET_AUTHENTICATED:
    return {
      ...state,
      isAuthenticated: false
    };

  default:
    return state;
  }
};

export default reducer;
