import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/index.css';

import App from './App';
import { boardReducer } from './reducers/reducers';

/**
 * Combines all the reducers
 */
const rootReducer = combineReducers({
  boardReducer
});

/**
 * Creates redux store
 * Note: the window line is to be able to debug using redux-extension
 */
const store = createStore(
  rootReducer,
  {},
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

/**
 * Render this bad-boy in the root
 */
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
