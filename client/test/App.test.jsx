import {render, screen} from '@testing-library/react';
import React from 'react';
import App from '../src/components/App.jsx';


test('it should display Hello world', () => {
  render(<App />);
  const value = document.getElementById('test').textContent;
  expect(value).toBe('Hello world');
})