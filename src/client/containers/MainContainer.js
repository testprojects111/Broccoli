import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { i18nWait } from '../utils/i18n';
import { openModal } from '../actions/actions';

const propTypes = {
  t: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export class MainContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onOpenModal = this.handleOpenModal.bind(this);
  }

  handleOpenModal() {
    const { dispatch } = this.props;
    dispatch(openModal(true));
  }

  render() {
    const { t } = this.props;
    return (
      <div className="main__container">
        <section className="main__title">
          <p>{t('mainTtile1')}</p>
          <p>{t('mainTtile2')}</p>
        </section>
        <section className="main__content">{t('mainContent')}</section>
        <button type="button" className="main__btn" onClick={this.onOpenModal}>{t('mainRequestBtn')}</button>
      </div>
    );
  }
}

MainContainer.propTypes = propTypes;

export default connect()(translate(['broccoli'], { wait: i18nWait })(MainContainer));
