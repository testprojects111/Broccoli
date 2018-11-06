import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { SuccessModal } from '../../../../src/client/components/SuccessModal';


describe('Test SuccessModal component', () => {
  const closeHanlder = sinon.stub();
  const props = {
    t: key => key,
    closeHanlder,
  };
  let enzymeWrapper;
  beforeAll(() => {
    enzymeWrapper = shallow(<SuccessModal {...props} />);
  });

  afterEach(() => {
    closeHanlder.reset();
  });

  it('should render self', () => {
    expect(enzymeWrapper.length).toEqual(1);
  });

  it('should render content', () => {
    expect(enzymeWrapper.find('.modal__content').length).toBe(1);
    expect(enzymeWrapper.find('.modal__header').length).toBe(1);
    expect(enzymeWrapper.find('.modal__msg').length).toBe(1);
  });

  it('should call closeHanlder when click button', () => {
    enzymeWrapper.find('button').at(0).simulate('click');
    expect(closeHanlder.callCount).toBe(1);
  });
});
