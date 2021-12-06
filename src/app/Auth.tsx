import React from 'react';
import { HashRouter } from 'react-router-dom';

import ScrollToTop from '@atoms/ScrollToTop/ScrollToTop';

import App from './App';

const Auth: React.FC = () => {
  // Render JSX
  return (
    <HashRouter>
      <ScrollToTop />
      <App />
    </HashRouter>
  );
};

export default Auth;
