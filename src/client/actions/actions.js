import * as ActionTypes from './ActionTypes';

export const setResult = result => ({ type: ActionTypes.SET_RESULT, payload: result });

export const getResult = (name, email) => (dispatch) => {
  const url = '/request';
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify({ name, email }),
    headers: {
      accept: 'application/json',
      'content-type': 'application/json; charset=utf-8',
    },
  }).then(response => response.json()).then((res) => {
    const data = res.errorMessage ? res.errorMessage : res;
    dispatch(setResult(data));
  }).catch(() => {
    dispatch(setResult('Error'));
  });
};

export const closeModal = () => ({ type: ActionTypes.CLOSE_MODAL });
export const openModal = renew => (dispatch) => {
  if (renew) {
    dispatch(setResult(''));
  }
  dispatch({ type: ActionTypes.OPEN_MODAL });
};
