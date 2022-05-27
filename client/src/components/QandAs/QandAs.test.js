import {render} from '@testing-library/react';
import React from 'react';
// import ReactDom from 'react-dom';
// import '@testing-library/jest-dom';
// import QandAs from '../App.jsx';
import QandAs from './QandAs.jsx';

describe('QandAs', () => {
  test('check that QandAs component renders', () => {
    render(<QandAs/>);
  });
});