import { combineReducers } from 'redux';
import * as ActionTypes from '../actions/ActionTypes';

export const openModal = (state = false, action) => {
  switch (action.type) {
    case ActionTypes.OPEN_MODAL:
      return true;
    case ActionTypes.CLOSE_MODAL:
      return false;
    default:
      return state;
  }
};

export const setResult = (state = '', action) => {
  if (action.type === ActionTypes.SET_RESULT) {
    return (action.payload || '');
  }
  return state;
};

const combinedReducers = combineReducers({
  openModal,
  msg: setResult,
});

const rootReducer = (state = {}, action) => combinedReducers(state, action);

export default rootReducer;
