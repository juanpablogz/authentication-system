import React from 'react';

import { render } from '@src/test-utils';

import LinkHotspot from './LinkHotspot';

describe('<LinkHotspot/>', () => {
  test('renders LinkHotspot component', () => {
    const { getByTestId } = render(<LinkHotspot />);
    expect(getByTestId('LinkHotspot')).toBeInTheDocument();
  });
});
