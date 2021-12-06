import React from 'react';

import { render } from '@src/test-utils';

import Sidebar from './Sidebar';

describe('<Sidebar/>', () => {
  test('renders Sidebar component', () => {
    const { getByTestId } = render(<Sidebar />);
    expect(getByTestId('Sidebar')).toBeInTheDocument();
  });
});
