import React from 'react';

import { render } from '@src/test-utils';

import VideoHotspot from './VideoHotspot';

describe('<VideoHotspot/>', () => {
  test('renders VideoHotspot component', () => {
    const { getByTestId } = render(<VideoHotspot />);
    expect(getByTestId('VideoHotspot')).toBeInTheDocument();
  });
});
