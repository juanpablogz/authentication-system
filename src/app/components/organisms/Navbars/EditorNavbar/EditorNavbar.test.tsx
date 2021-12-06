import React from 'react';
import { render } from '@src/test-utils';
import EditorNavbar from './EditorNavbar';

describe('<EditorNavbar/>', () => {
  test('renders EditorNavbar component', () => {
    const { getByTestId } = render(<EditorNavbar />);
    expect(getByTestId('EditorNavbar')).toBeInTheDocument();
  });
});
