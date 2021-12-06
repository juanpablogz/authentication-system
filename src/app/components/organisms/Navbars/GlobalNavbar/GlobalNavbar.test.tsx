import React from 'react';
import { render } from '@src/test-utils';
import GlobalNavbar from './GlobalNavbar';

describe('<GlobalNavbar/>', () => {
  test('renders GlobalNavbar component', () => {
    const { getByTestId } = render(<GlobalNavbar />);
    expect(getByTestId('GlobalNavbar')).toBeInTheDocument();
  });
});
