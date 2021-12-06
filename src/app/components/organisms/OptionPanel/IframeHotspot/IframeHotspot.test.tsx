import React from 'react';

import { render } from '@src/test-utils';

import IframeHotspot from './IframeHotspot';

describe('<IframeHotspot/>', () => {
  test('renders IframeHotspot component', () => {
    const { getByTestId } = render(<IframeHotspot />);
    expect(getByTestId('IframeHotspot')).toBeInTheDocument();
  });
});
