import React from 'react';

import { render } from '@src/test-utils';

import OptionPanel from './OptionPanel';

describe('<OptionPanel/>', () => {
  test('renders OptionPanel component', () => {
    const { getByTestId } = render(<OptionPanel />);
    expect(getByTestId('OptionPanel')).toBeInTheDocument();
  });
});
