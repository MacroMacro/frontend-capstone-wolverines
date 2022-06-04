import { render, fireEvent, screen } from '@testing-library/react';
import React from 'react';
import App from '../src/components/App.jsx';
import QandAs from '../src/components/QandAs/QandAs.jsx';
import AddAnswer from '../src/components/QandAs/AddAnswer.jsx';
import AddQuestion from '../src/components/QandAs/AddQuestion.jsx';
import Question from '../src/components/QandAs/Question.jsx';
import SearchQuestions from '../src/components/QandAs/SearchQuestions.jsx';
import dummyQuestions from './sampleData.js';

describe('QandAs', () => {
  test('check that QandAs component renders', () => {
    render(<QandAs/>);
  });
});

describe('Add Answer form', () => {
  test('check that alt appears in add answer form images', () => {
    render (<AddAnswer/>);
    expect(screen.findByAltText('chosen').toExist);
  });
  test('', () => {

  })
})

// describe('Question', () => {
//   test('check that alt appears in user uploaded images', () => {
//     render(<Question/>);
//     // const imageAlt = await expect(screen.findByAltText("answerer's image").toExist);
//   });
// });
