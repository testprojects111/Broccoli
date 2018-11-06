import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { i18nWait } from '../utils/i18n';

const propTypes = {
  t: PropTypes.func.isRequired,
  closeHanlder: PropTypes.func.isRequired,
};

export const SuccessModal = (props) => {
  const { t, closeHanlder } = props;
  return (
    <div className="modal__content">
      <h2 className="modal__header">{t('SuccessModal.title')}</h2>
      <p className="modal__msg">{t('SuccessModal.content')}</p>
      <button className="modal__btn" type="button" onClick={closeHanlder}>{t('SuccessModal.okBtn')}</button>
    </div>
  );
};

SuccessModal.propTypes = propTypes;

const SuccessModalWrapper = translate(['broccoli'], { wait: i18nWait })(SuccessModal);
export default SuccessModalWrapper;
