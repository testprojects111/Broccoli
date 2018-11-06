import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { MainContainer } from '../../../../src/client/containers/MainContainer';
import * as actions from '../../../../src/client/actions/actions';

jest.mock('react-i18next', () => {
  const i18next = {};
  i18next.translate = () => {
    const cb = component => component;
    return cb;
  };
  return i18next;
});

describe('Test MainContainer', () => {
  const dispatchStub = sinon.stub();
  const openModalStub = sinon.stub(actions, 'openModal');
  const t = key => key;
  const props = {
    dispatch: dispatchStub,
    t,
  };
  const mockStore = configureMockStore();
  const store = mockStore();
  store.dispatch = dispatchStub;
  let mainContainer;
  beforeAll(() => {
    mainContainer = mount(
      <MainContainer {...props} />,
    );
  });
  beforeEach(() => {
    openModalStub.reset();
    dispatchStub.reset();
  });

  it('should render content', () => {
    expect(mainContainer.find('.main__container').length).toBe(1);
    expect(mainContainer.find('.main__title').length).toBe(1);
    expect(mainContainer.find('.main__content').length).toBe(1);
    expect(mainContainer.find('.main__btn').length).toBe(1);
  });

  it('should open modal when click main__btn', () => {
    mainContainer.find('.main__btn').at(0).simulate('click');
    expect(openModalStub.callCount).toBe(1);
  });
});
