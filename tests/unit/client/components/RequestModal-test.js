import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { RequestModal } from '../../../../src/client/components/RequestModal';


describe('Test RequestModal component', () => {
  const submitHandler = sinon.stub();
  const props = {
    t: key => key,
    submitHandler
  };
  let enzymeWrapper;
  beforeAll(() => {
    enzymeWrapper = shallow(<RequestModal {...props} />);
  });

  afterEach(() => {
    submitHandler.reset();
  });

  it('should render self', () => {
    expect(enzymeWrapper.length).toEqual(1);
  });

  it('should render content', () => {
    expect(enzymeWrapper.find('.modal__content').length).toBe(1);
    expect(enzymeWrapper.find('.modal__header').length).toBe(1);
    expect(enzymeWrapper.find('.modal__input').length).toBe(3);
    expect(enzymeWrapper.find('.modal__input--error').length).toBe(0);
    expect(enzymeWrapper.find('.modal__input--errormsg').length).toBe(0);
  });

  it('should validate name field if length < 3', () => {
    const e = {
      target: {
        value: 'a',
      },
    };
    enzymeWrapper.find('.modal__input').at(0).simulate('change', e);
    expect(enzymeWrapper.find('.modal__input--error').length).toBe(1);
    expect(enzymeWrapper.find('.modal__input--errormsg').length).toBe(1);
  });

  it('should validate name field if length > 3', () => {
    const e = {
      target: {
        value: 'test',
      },
    };
    enzymeWrapper.find('.modal__input').at(0).simulate('change', e);
    expect(enzymeWrapper.find('.modal__input--error').length).toBe(0);
    expect(enzymeWrapper.find('.modal__input--errormsg').length).toBe(0);
  });

  it('should validate email field if pass not valid email address', () => {
    const e = {
      target: {
        value: 'test',
      },
    };
    enzymeWrapper.find('.modal__input').at(1).simulate('change', e);
    expect(enzymeWrapper.find('.modal__input--error').length).toBe(1);
    expect(enzymeWrapper.find('.modal__input--errormsg').length).toBe(1);
  });

  it('should validate email field if pass valid email address', () => {
    const e = {
      target: {
        value: 'test@test.com',
      },
    };
    enzymeWrapper.find('.modal__input').at(1).simulate('change', e);
    expect(enzymeWrapper.find('.modal__input--error').length).toBe(0);
    expect(enzymeWrapper.find('.modal__input--errormsg').length).toBe(0);
  });

  it('should validate confirmEmail field if not same as email field', () => {
    const e1 = {
      target: {
        value: 'test1@test.com',
      },
    };
    const e2 = {
      target: {
        value: 'test@test.com',
      },
    };
    enzymeWrapper.find('.modal__input').at(1).simulate('change', e1);
    enzymeWrapper.find('.modal__input').at(2).simulate('change', e2);
    expect(enzymeWrapper.find('.modal__input--error').length).toBe(1);
    expect(enzymeWrapper.find('.modal__input--errormsg').length).toBe(1);
  });

  it('should validate confirmEmail field if same as email field', () => {
    const e = {
      target: {
        value: 'test@test.com',
      },
    };
    enzymeWrapper.find('.modal__input').at(1).simulate('change', e);
    enzymeWrapper.find('.modal__input').at(2).simulate('change', e);
    expect(enzymeWrapper.find('.modal__input--error').length).toBe(0);
    expect(enzymeWrapper.find('.modal__input--errormsg').length).toBe(0);
  });

  it('should not handle submit if any fields is invalid', () => {
    const e1 = {
      target: {
        value: 'a',
      },
    };
    enzymeWrapper.find('.modal__input').at(0).simulate('change', e1);
    enzymeWrapper.find('.modal__btn').at(0).simulate('click');
    expect(enzymeWrapper.find('.modal__input--error').length).toBe(1);
    expect(enzymeWrapper.find('.modal__input--errormsg').length).toBe(1);
  });

  it('should handle submit if all fields is valid', () => {
    const e1 = {
      target: {
        value: 'test',
      },
    };
    const e2 = {
      target: {
        value: 'test@test.com',
      },
    };
    enzymeWrapper.find('.modal__input').at(0).simulate('change', e1);
    enzymeWrapper.find('.modal__input').at(1).simulate('change', e2);
    enzymeWrapper.find('.modal__input').at(2).simulate('change', e2);
    enzymeWrapper.find('.modal__btn').at(0).simulate('click');
    expect(enzymeWrapper.find('.modal__input--error').length).toBe(0);
    expect(enzymeWrapper.find('.modal__input--errormsg').length).toBe(0);
    expect(submitHandler.callCount).toBe(1);
  });
});
