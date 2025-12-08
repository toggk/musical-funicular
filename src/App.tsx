import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { StorePage } from './pages/StorePage';

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <StorePage />
    </Provider>
  );
};
