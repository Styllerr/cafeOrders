import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';

import {fetchMenuSections} from './store/actions/menuSections';
import {fetchDishes} from './store/actions/dishes';
import {fetchWaiters} from './store/actions/waiters';
import {fetchOrders} from './store/actions/orders';

store.dispatch(fetchMenuSections());
store.dispatch(fetchDishes());
store.dispatch(fetchWaiters());
store.dispatch(fetchOrders());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
