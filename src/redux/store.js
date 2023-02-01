import { legacy_createStore as createStore } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import rootReducer from './reducers';

const store = createStore(rootReducer, composeWithDevTools());

// script necessário para que o Cypress enxergue a store

if (window.Cypress) {
  window.store = store;
}

export default store;
