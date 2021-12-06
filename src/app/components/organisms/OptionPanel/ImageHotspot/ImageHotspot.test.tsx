import React from 'react';

import { render } from '@src/test-utils';

import ImageHotspot from './ImageHotspot';

describe('<ImageHotspot/>', () => {
  test('renders ImageHotspot component', () => {
    const { getByTestId } = render(<ImageHotspot />);
    expect(getByTestId('ImageHotspot')).toBeInTheDocument();
  });
});
