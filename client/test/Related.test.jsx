import {render} from '@testing-library/react';
import React from 'react';
import RelatedItems from '../src/components/RelatedItems/RelatedItems.jsx';
import RelatedProductsList from '../src/components/RelatedItems/RelatedProductsList.jsx';

test('it should display', () => {
  render(<ReviewListEntry/>);
  const value = document.getElementById('report').textContent;
  expect(value).toBe('Report');
})

// describe('RelatedItems', () => {
//   test('renders ReviewList component', () => {
//     render(<RelatedItems />);
//   });
// });

