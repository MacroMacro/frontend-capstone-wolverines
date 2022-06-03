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

describe('ReviewListntry', () => {
  test('renders ReviewListEntry component', () => {
    render(<Ratings />);
  });
});

test('it should display', () => {
  render(<ReviewListEntry/>);
  const value = document.getElementById('report').textContent;
  expect(value).toBe('No');
})

test('it should display', () => {
  render(<ReviewListEntry/>);
  const value = document.getElementById('helpful').textContent;
  expect(value).toBe('Yes');
})

test('it should display', () => {
  render(<ReviewListy/>);
  const value = document.getElementById('reviewBody').textContent;
  expect(value).toBe('Review Body: *');
})

test('it should display', () => {
  render(<ReviewList/>);
  const value = document.getElementById('productT').textContent;
  expect(value).toBe('Write Your Review');
})

test('it should display', () => {
  render(<Ratings/>);
  const value = document.getElementById('starRate').textContent;
  expect(value).toBe('5 stars');
})

test('it should display', () => {
  render(<Ratings/>);
  const value = document.getElementById('starRate').textContent;
  expect(value).toBe('5 stars');
})

test('it should display', () => {
  render(<Ratings/>);
  const value = document.getElementById('small').textContent;
  expect(value).toBe('Too small');
})

test('it should display', () => {
  render(<Ratings/>);
  const value = document.getElementById('small').textContent;
  expect(value).toBe('Too small');
})

// describe('ReviewList', () => {
//   it('renders ReviewListEntry', () => {
//     const wrapper = render(<ReviewList body = {body} />);
//     expect(wrapper.containsMatchingElement(<ReviewListEntry />)).toEqual(true);
//   });
// });