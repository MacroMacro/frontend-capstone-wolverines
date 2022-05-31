import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddQuestion from './AddQuestion.jsx'
import Question from './Question.jsx'
import SearchQuestions from './SearchQuestions.jsx';

function QandAs ({ product_id, toggleQuestionForm, toggleAnswerForm, updateAnswerID }) {
  // State
  const [qnaFirstFour, setQnaFirstFour] = useState([]);
  const [qnaRest, setQnaRest] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showMoreAnswers, setShowMoreAnswers] = useState(false);
  const [
    hasComponentSearched,
    setHasComponentSearched
  ] = useState(false)

  // setState
  const changeShowMoreAnswers = () =>
    setShowMoreAnswers(!showMoreAnswers);

    const changeShowForm = () =>
      setShowForm(!showForm);
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

  const getQuestions = (search = null) => {
    axios.get(`/qa/questions/?product_id=${product_id}&search=${search}`)
    .then((res) => {
      const { results: questions } = res.data;
      console.log(res.data);
      let firstFour = questions.slice(0, 4);
      let rest = questions.slice(4);

      setQnaFirstFour(createQuestionStateObj(firstFour));
      setQnaRest(createQuestionStateObj(rest));
    })
    .catch(err => console.log('error fetching from qna, ', err));
  }

  const searchQuestions = (search) => {
    console.log(hasComponentSearched, search);
    if (!hasComponentSearched && !search) {
      return;
    }

    if (hasComponentSearched && !search) {
        setHasComponentSearched(false)
    } else if (!hasComponentSearched && search) {
      setHasComponentSearched(true)
    }

    getQuestions(search);
  }

  const qSubmit = () => {
    setShowForm(false);
    getQuestions();
  }


  const qHelpfulness = () => {
    getQuestions();
  }

  useEffect(getQuestions, []);

  // console.log(showForm);
  return(
    <div>
      <h1 data-testid="test1">Questions & Answers</h1>
      <SearchQuestions searchQuestions={searchQuestions} product_id={product_id}/>
      {qnaFirstFour.length ? (
        <div className="qna-box">
          {qnaFirstFour.map(oneQna => (
            <div key={oneQna.question_id}>
              <Question qHelpfulness={qHelpfulness} question={oneQna} updateAnswerID={updateAnswerID} toggleAnswerForm={toggleAnswerForm}/>
            </div>
          ))}
          {showMoreAnswers && qnaRest.map(restQna => (
            <div key={restQna.question_id}>
              <Question qHelpfulness={qHelpfulness} question={restQna} updateAnswerID={updateAnswerID} toggleAnswerForm={toggleAnswerForm}/>
            </div>
          ))}
          <div className="qna-buttons">
            <button
              type='button'
              onClick={changeShowMoreAnswers}
            >
              {`${showMoreAnswers ? 'Hide More' : 'More'} Answered Questions`}
            </button>
            <button
              onClick={toggleQuestionForm}
            >
              Add a Question
            </button>
          </div>
        </div>
      ) : <div>
            <button onClick={toggleQuestionForm}>Add a Question</button>
        </div>}
        {/* {showForm ? <AddQuestion product_id={product_id} qSubmit={qSubmit}/> : null} */}
    </div>
  );
}

export default QandAs