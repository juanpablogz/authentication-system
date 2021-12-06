import React from 'react';

import { render } from '@src/test-utils';

import GoToHotspot from './GoToHotspot';

describe('<GoToHotspot/>', () => {
  test('renders GoToHotspot component', () => {
    const { getByTestId } = render(<GoToHotspot />);
    expect(getByTestId('GoToHotspot')).toBeInTheDocument();
  });
});
