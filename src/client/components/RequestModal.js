/* eslint-disable no-useless-escape */

import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { i18nWait } from '../utils/i18n';

const propTypes = {
  t: PropTypes.func.isRequired,
  submitHandler: PropTypes.func.isRequired,
};

export class RequestModal extends React.Component {
  static checkName(name) {
    if (typeof name === 'string' && name.length > 2) {
      return false;
    }
    return true;
  }

  static checkEmail(email) {
    const pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return pattern.test(email);
  }

  static getDerivedStateFromProps({ msg }, { sending }) {
    if (msg && sending) {
      return { sending: false, displayMsg: msg };
    }
    return { displayMsg: '' };
  }

  constructor(props) {
    super(props);
    this.state = {
      nameIvalid: false,
      emailInvalid: false,
      confirmEmailInvalid: false,
    };
    this.onSubmit = this.handleSubmit.bind(this);
    this.onNameChange = this.handleNameChange.bind(this);
    this.onEmailChange = this.handleEmailChange.bind(this);
    this.onConfirmEmailChange = this.handleConfirmEmailChange.bind(this);
  }

  handleSubmit() {
    const { submitHandler } = this.props;
    const {
      name, email, confirmEmail,
    } = this.state;
    const nameIvalid = RequestModal.checkName(name);
    const emailInvalid = !email || !RequestModal.checkEmail(email);
    const confirmEmailInvalid = confirmEmail !== email;
    this.setState({
      nameIvalid, emailInvalid, confirmEmailInvalid, sending: true,
    });
    if (!nameIvalid && !emailInvalid && !confirmEmailInvalid) {
      submitHandler(name, email);
    }
  }

  handleNameChange(e) {
    const name = e.target.value.trim();
    const nameIvalid = RequestModal.checkName(name);
    this.setState({ name, nameIvalid });
  }

  handleEmailChange(e) {
    const email = e.target.value.trim();
    const { confirmEmail } = this.state;
    const emailInvalid = !email || !RequestModal.checkEmail(email);
    const confirmEmailInvalid = confirmEmail !== email;
    if (confirmEmailInvalid) {
      this.setState({ email, emailInvalid });
    } else {
      this.setState({ email, emailInvalid, confirmEmailInvalid });
    }
  }

  handleConfirmEmailChange(e) {
    const confirmEmail = e.target.value.trim();
    const { email } = this.state;
    const emailInvalid = !email || !RequestModal.checkEmail(email);
    const confirmEmailInvalid = confirmEmail !== email;
    if (emailInvalid) {
      this.setState({ confirmEmail, confirmEmailInvalid });
    } else {
      this.setState({ confirmEmail, confirmEmailInvalid, emailInvalid });
    }
  }

  render() {
    const { t } = this.props;
    const {
      nameIvalid, emailInvalid, confirmEmailInvalid, sending, displayMsg,
    } = this.state;
    return (
      <form className="modal__content">
        <h2 className="modal__header">{t('requestModal.title')}</h2>
        <input
          className={`modal__input ${nameIvalid ? 'modal__input--error' : ''}`}
          placeholder={t('requestModal.namePlaceHolder')}
          onChange={this.onNameChange}
        />
        {nameIvalid && (<p className="modal__input--errormsg">{t('requestModal.nameErrorMsg')}</p>)}
        <input
          className={`modal__input ${emailInvalid ? 'modal__input--error' : ''}`}
          placeholder={t('requestModal.emailPlaceHolder')}
          onChange={this.onEmailChange}
        />
        {emailInvalid && (<p className="modal__input--errormsg">{t('requestModal.emailErrorMsg')}</p>)}
        <input
          className={`modal__input ${confirmEmailInvalid ? 'modal__input--error' : ''}`}
          placeholder={t('requestModal.confirmEmailPlaceHolder')}
          onChange={this.onConfirmEmailChange}
        />
        {confirmEmailInvalid && (<p className="modal__input--errormsg">{t('requestModal.confirmEmailErrorMsg')}</p>)}
        <button
          className="modal__btn"
          type="button"
          onClick={this.onSubmit}
        >
          {sending ? t('requestModal.sendingBtn') : t('requestModal.sendBtn')}
        </button>
        {displayMsg && <p className="modal__msg">{displayMsg}</p>}
      </form>
    );
  }
}

RequestModal.propTypes = propTypes;

const RequestModalWrapper = translate(['broccoli'], { wait: i18nWait })(RequestModal);
export default RequestModalWrapper;
