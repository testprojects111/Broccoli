import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import ConnectedModalsContainer, { ModalsContainer } from '../../../../src/client/containers/ModalsContainer';
import * as actions from '../../../../src/client/actions/actions';

jest.mock('../../../../src/client/components/RequestModal', () => (
  function RequestModal() {
    return (<div>mocked RequestModal</div>);
  }
));

jest.mock('../../../../src/client/components/SuccessModal', () => (
  function SuccessModal() {
    return (<div>mocked SuccessModal</div>);
  }
));

jest.mock('react-i18next', () => {
  const i18next = {};
  i18next.translate = () => {
    const cb = component => component;
    return cb;
  };
  return i18next;
});

describe('Test ModalsContainer', () => {
  const dispatchStub = sinon.stub();
  const closeModalStub = sinon.stub(actions, 'closeModal');
  const setResultStub = sinon.stub(actions, 'setResult');
  const getResultStub = sinon.stub(actions, 'getResult');
  const t = key => key;
  const props = {
    dispatch: dispatchStub,
    openModal: true,
    msg: '',
    t,
  };
  const mockStore = configureMockStore();
  const store = mockStore({
    openModal: true,
    msg: '',
  });
  store.dispatch = dispatchStub;
  let modalsContainer;
  let connectedModalsContainer;
  beforeAll(() => {
    modalsContainer = mount(
      <ModalsContainer {...props} />,
    );
    connectedModalsContainer = mount(<ConnectedModalsContainer t={t} store={store} />);
  });
  beforeEach(() => {
    dispatchStub.reset();
    closeModalStub.reset();
    setResultStub.reset();
    getResultStub.reset();
  });

  it('should pass correct props to ModalsContainer from state', () => {
    const mappedProps = connectedModalsContainer.find('ModalsContainer').props();
    expect(mappedProps.msg).toBe('');
    expect(mappedProps.openModal).toEqual(true);
  });

  it('should not render content when openModal is false', () => {
    const newStore = mockStore({
      openModal: false,
      msg: '',
    });
    const container = mount(<ConnectedModalsContainer t={t} store={newStore} />);
    expect(container.find('.modal').length).toEqual(0);
    expect(container.find('.modal__close').length).toBe(0);
  });

  it('should render content when openModal is true', () => {
    expect(modalsContainer.find('.modal').length).toBe(1);
    expect(modalsContainer.find('.modal__close').length).toBe(1);
  });

  it('should render SuccessModal when msg is Registered', () => {
    const newStore = mockStore({
      openModal: true,
      msg: 'Registered',
    });
    const container = mount(<ConnectedModalsContainer t={t} store={newStore} />);
    expect(container.find('SuccessModal').length).toBe(1);
  });

  it('should render RequestModal when msg is not Registered', () => {
    expect(connectedModalsContainer.find('RequestModal').length).toBe(1);
  });

  it('should close modal when click modal__close', () => {
    modalsContainer.find('.modal__close').at(0).simulate('click');
    expect(closeModalStub.callCount).toBe(1);
  });
});
