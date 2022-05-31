import {render} from '@testing-library/react';
import React from 'react';
import QandAs from './QandAs.jsx';

describe('QandAs', () => {
  test('check that QandAs component renders', () => {
    render(<QandAs/>);
  });
});