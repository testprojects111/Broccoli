import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { closeModal, getResult, setResult } from '../actions/actions';
import RequestModalWrapper from '../components/RequestModal';
import SuccessModalWrapper from '../components/SuccessModal';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  openModal: PropTypes.bool.isRequired,
  msg: PropTypes.string.isRequired,
};

export class ModalsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.close = this.closeHandler.bind(this);
    this.submitHandler = this.handleSubmit.bind(this);
  }

  closeHandler() {
    const { dispatch } = this.props;
    dispatch(closeModal());
  }

  handleSubmit(name, email) {
    const { dispatch } = this.props;
    dispatch(setResult(''));
    dispatch(getResult(name, email));
  }

  render() {
    const {
      msg, openModal,
    } = this.props;


    const child = msg === 'Registered' ? (
      <SuccessModalWrapper closeHanlder={this.close} />
    ) : (
      <RequestModalWrapper submitHandler={this.submitHandler} msg={msg} />
    );

    return (openModal ? (
      <div className="modal">
        <button type="button" className="modal__close" onClick={this.close}>+</button>
        {child}
      </div>
    ) : null);
  }
}

const mapStateToProps = state => ({
  openModal: state.openModal,
  msg: state.msg,
});

ModalsContainer.propTypes = propTypes;

export default connect(mapStateToProps)(ModalsContainer);
