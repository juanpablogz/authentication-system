import React from 'react';

import { render } from '@src/test-utils';

import Product360Item from './Product360Hotspot';

describe('<Product360Item/>', () => {
  test('renders Product360Item component', () => {
    const { getByTestId } = render(<Product360Item />);
    expect(getByTestId('Product360Item')).toBeInTheDocument();
  });
});
