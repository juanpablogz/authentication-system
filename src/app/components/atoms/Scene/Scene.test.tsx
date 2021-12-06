import React from 'react';

import { render } from '@src/test-utils';

import Scene from './Scene';

describe('<Scene/>', () => {
  test('renders Scene component', () => {
    const { getByTestId } = render(<Scene index={1} id={1} moveScene={() => console.log('move')} />);
    expect(getByTestId('Scene')).toBeInTheDocument();
  });
});
