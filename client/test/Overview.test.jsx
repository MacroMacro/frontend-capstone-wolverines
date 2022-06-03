import {render, fireEvent, screen} from '@testing-library/react';
import React from 'react';
import App from '../src/components/App.jsx';
import {product, photos, navBar, skus1, skus2} from './sampleData.js';
import Overview from '../src/components/Overview/Overview.jsx';
import Skus from '../src/components/Overview/Skus.jsx';

describe('Overview', () => {
  test('Renders navigation bar', async () => {
    render(<App/>);
    expect(screen.findByAltText('Wolverine').toExist);
  });
  test('Style selection', () => {
    expect(screen.findByAltText('STYLE').toExist);
  });
  test('Size selection', () => {
    expect(screen.findByAltText('SELECT SIZE').toExist);
  });

//   test('add to cart button', () => {
//     expect(screen.findByAltText('Add to Cart').toExist);
//   });

//   test('render product info correctly', () => {
//     expect(screen.findByAltText('Jackets').toExist);
//     expect(screen.findByAltText('Camo Onesie').toExist);
//   });

//   test('warning for add-to-cart if not choose size', async () => {
//     render(<Skus skus={skus1}/>);
//     const CartButton = await screen.findByTestId('cartbutton');
//     fireEvent.click(CartButton);
//     expect(screen.findByAltText('PLEASE SELECT SIZE').toExist);
//   });

//   test('out-of-stock for empty skus', async () => {
//     render(<Skus skus={skus2}/>);
//     expect(screen.findByAltText('OUT OF STOCK').toExist);
//   })

// });