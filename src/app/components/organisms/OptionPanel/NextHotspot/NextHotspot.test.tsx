import React from 'react';

import { render } from '@src/test-utils';

import NextHotspot from './NextHotspot';

describe('<NextHotspot/>', () => {
  test('renders NextHotspot component', () => {
    const { getByTestId } = render(<NextHotspot />);
    expect(getByTestId('NextHotspot')).toBeInTheDocument();
  });
});
