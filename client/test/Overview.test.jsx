import {render, screen} from '@testing-library/react';
import React from 'react';
import Overview from '../src/components/Overview/Overview.jsx';

describe('Overview', () => {
  test('renders overview conponent', () => {
    var product = {
      "id": 40347,
      "campus": "hr-rfp",
      "name": "Slacker's Slacks",
      "slogan": "Comfortable for everything, or nothing",
      "description": "I'll tell you how great they are after I nap for a bit.",
      "category": "Pants",
      "default_price": "65.00",
      "created_at": "2021-08-13T14:38:44.509Z",
      "updated_at": "2021-08-13T14:38:44.509Z"
    };
    render(<Overview product = {product}/>);
    screen.debug();
  });
});