import React from 'react';
import { render } from 'react-dom';
import { I18nextProvider } from 'react-i18next';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import i18n from './utils/i18n';
import RootReducer from './reducers/rootReducer';
import ModalsWrapper from './containers/ModalsContainer';
import MainContainerWrapper from './containers/MainContainer';

const middlewares = [thunk];
const store = createStore(RootReducer, applyMiddleware(...middlewares));

render(
  <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <React.Fragment>
        <MainContainerWrapper />
        <ModalsWrapper />
      </React.Fragment>
    </Provider>
  </I18nextProvider>,
  document.getElementById('content'),
);
