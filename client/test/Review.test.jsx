import {render} from '@testing-library/react';
import React from 'react';
import ReviewList from '../src/components/Reviews/ReviewList.jsx';
import ReviewListEntry from '../src/components/Reviews/ReviewListEntry.jsx';

test('it should display', () => {
  render(<ReviewListEntry/>);
  const value = document.getElementById('report').textContent;
  expect(value).toBe('No');
})

describe('ReviewList', () => {
  test('renders ReviewList component', () => {
    render(<ReviewList />);
  });
});

describe('ReviewListntry', () => {
  test('renders ReviewListEntry component', () => {
    render(<ReviewListEntry />);
  });
});

// describe('ReviewList', () => {
//   it('renders ReviewListEntry', () => {
//     const wrapper = render(<ReviewList body = {body} />);
//     expect(wrapper.containsMatchingElement(<ReviewListEntry />)).toEqual(true);
//   });
// });