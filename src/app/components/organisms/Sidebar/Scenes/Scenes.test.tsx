import React from 'react';

import { render } from '@src/test-utils';

import Scenes from './Scenes';

describe('<Scenes/>', () => {
  test('renders Scenes component', () => {
    const { getByTestId } = render(<Scenes />);
    expect(getByTestId('Scenes')).toBeInTheDocument();
  });
});
