import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import * as actions from '../../../../src/client/actions/actions';
import * as types from '../../../../src/client/actions/ActionTypes';

describe('test archivePolicy actions', () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  beforeEach(() => {
    fetchMock.restore();
  });

  it('should create an action to open a modal', () => {
    const store = mockStore({});
    const expectedAction = [{
      type: types.OPEN_MODAL,
    }];
    store.dispatch(actions.openModal());
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should set msg to open a modal with true', () => {
    const store = mockStore({});
    const expectedAction = [
      {
        type: types.SET_RESULT,
        payload: '',
      }, {
        type: types.OPEN_MODAL,
      },
    ];
    store.dispatch(actions.openModal(true));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to close a modal', () => {
    const expectedAction = {
      type: types.CLOSE_MODAL,
    };
    expect(actions.closeModal()).toEqual(expectedAction);
  });

  it('should set msg to set result', () => {
    const msg = { msg: 'text' };
    const expectedAction = {
      type: types.SET_RESULT,
      payload: msg,
    };
    expect(actions.setResult(msg)).toEqual(expectedAction);
  });

  it('test getResult action', async () => {
    const store = mockStore({});
    const name = 'testname';
    const email = 'testemail';
    const body = { name, email };
    fetchMock.mock('/request', JSON.stringify(body));
    const expectedActions = [
      { payload: { email: 'testemail', name: 'testname' }, type: 'SET_RESULT' },
    ];
    await store.dispatch(actions.getResult(name, email));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('test getResult action with error message', async () => {
    const store = mockStore({});
    const name = 'testname';
    const email = 'testemail';
    const body = { errorMessage: 'errorMessage' };
    fetchMock.mock('/request', JSON.stringify(body));
    const expectedActions = [
      { payload: 'errorMessage', type: 'SET_RESULT' },
    ];
    await store.dispatch(actions.getResult(name, email));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
