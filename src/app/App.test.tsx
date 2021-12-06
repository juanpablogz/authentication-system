import React from 'react';

import { render } from '../test-utils';

import App from './App';

describe('<App/>', () => {
  test('renders App component', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('App')).toBeInTheDocument();
  });
});
