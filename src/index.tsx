import React from 'react';
import ReactDOM from 'react-dom';
import Auth from './app/Auth';
import { AuthProvider } from '@contexts/AuthContext';
import './theme/base/index.scss';

// Codemirror styles
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/scroll/simplescrollbars';

import 'codemirror/mode/css/css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/addon/scroll/simplescrollbars.css';

ReactDOM.render(
  <AuthProvider>
    <Auth />
  </AuthProvider>,
  document.getElementById('root'),
);
