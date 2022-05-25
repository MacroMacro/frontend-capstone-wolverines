import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddQuestion from './AddQuestion.jsx'
import Question from './Question.jsx'

function QandAs ({ product_id }) {
  // State
  const [qnaFirstFour, setQnaFirstFour] = useState([]);
  const [qnaRest, setQnaRest] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showMoreAnswers, setShowMoreAnswers] = useState(false);

  // setState
  const changeShowMoreAnswers = () =>
    setShowMoreAnswers(!showMoreAnswers)

  // Component Methods
  const createQuestionStateObj = (questions) => {
    const result = []
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      let { answers } = question
      answers = Object.values(answers);

      const firstTwoAnswers = answers.slice(0,2);
      const restOfAnswers = answers.slice(2);

      result.push({
        'question_body': question.question_body,
        'question_date': question.question_date,
        'asker_name': question.asker_name,
        'question_helpfulness': question.question_helpfulness,
        'question_id': question.question_id,
        'reported': question.reported,
        'firstTwoAnswers': firstTwoAnswers,
        'restOfAnswers': restOfAnswers,
        'showMoreAnswers': false,
      })
    }

    return result;
  }

  // On Load
  const onQnALoad = () => {
    axios.get(`/qa/questions/?product_id=${product_id}`)
    .then((res) => {
      const { results: questions } = res.data;

      let firstFour = questions.slice(0, 4);
      let rest = questions.slice(4);

      firstFour = createQuestionStateObj(firstFour);
      rest = createQuestionStateObj(rest);

      setQnaFirstFour(firstFour)
      setQnaRest(rest)
    })
    .catch(err => console.log('error fetching from qna, ', err));
  }

  useEffect(onQnALoad, []);

  // console.log(showForm);
  return(
    <div>
      <h1>Questions & Answers</h1>

      {qnaFirstFour.length ? (
        <>
          {qnaFirstFour.map(oneQna => (
            <div key={oneQna.question_id}>
              <Question question={oneQna} />
            </div>
          ))}
          {showMoreAnswers && qnaRest.map(restQna => (
            <div key={restQna.question_id}>
              <Question question={restQna} />
            </div>
          ))}
          <div>
            <button
              type='button'
              onClick={changeShowMoreAnswers}
            >
              {`${showMoreAnswers ? 'Hide More' : 'More'} Answered Questions`}
            </button>
            <button
              onClick={()=>{setShowForm(true)}}
            >
              Add a Question
            </button>
          </div>
        </>
      ) : <div>
            <button onClick={()=>{setShowForm(true);}}>Add a Question</button>
        </div>}
        {showForm ? <AddQuestion product_id={product_id}/> : null}
    </div>
  );
}

export default QandAs