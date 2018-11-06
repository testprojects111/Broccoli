import * as types from '../../../../src/client/actions/ActionTypes';
import reducer from '../../../../src/client/reducers/rootReducer';

describe('Test rootReducer', () => {
  it('should handle SET_RESULT', () => {
    expect(reducer({}, { type: types.SET_RESULT, payload: 'test' })
      .msg).toEqual('test');
  });

  it('should handle OPEN_MODAL', () => {
    expect(reducer({}, { type: types.OPEN_MODAL })
      .openModal).toEqual(true);
  });

  it('should handle CLOSE_MODAL', () => {
    expect(reducer({}, { type: types.CLOSE_MODAL })
      .openModal).toEqual(false);
  });
});
