import React from 'react';

import { render } from '@src/test-utils';

import PreviousHotspot from './PreviousHotspot';

describe('<PreviousHotspot/>', () => {
  test('renders PreviousHotspot component', () => {
    const { getByTestId } = render(<PreviousHotspot />);
    expect(getByTestId('PreviousHotspot')).toBeInTheDocument();
  });
});
