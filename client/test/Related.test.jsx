import {render} from '@testing-library/react';
import React from 'react';
import RelatedItems from '../src/components/RelatedItems/RelatedItems.jsx';
import RelatedProductsList from '../src/components/RelatedItems/RelatedProductsList.jsx';
import RelatedProductCard from '../src/components/RelatedItems/RelatedProductCard.jsx';
import YourOutfits from '../src/components/RelatedItems/YourOutfits.jsx';
import OutfitCard from '../src/components/RelatedItems/OutfitCard.jsx';
import ComparisonModal from '../src/components/RelatedItems/ComparisonModal.jsx';
import axios from "axios";

jest.mock("axios");

describe('RelatedItems', () => {
  test('renders ReviewList component', async() => {
    render(<RelatedItems />);
  });
});

describe('YourOutfit', () => {
  test('renders OutfitCard component', async() => {
    render(<OutfitCard />);
  });
});

describe('RelatedProductCard', () => {
  test('renders RelatedProductCard component', async() => {
    render(<RelatedProductCard />);
  });
});

describe('RelatedProductCard', () => {
  test('renders RelatedProductCard component', async() => {
    render(<ComparisonModal />);
  });
});

describe('RelatedProductCard', () => {
  test('renders RelatedProductCard component', async() => {
    render(<YourOutfits />);
  });
});

describe('RelatedProductCard', () => {
  test('renders RelatedProductCard component', async() => {
    render(<RelatedProductsList />);
  });
});